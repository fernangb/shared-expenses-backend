import { IBaseUseCase } from '../../../../../shared/use-cases/base.use-case';
import { Inject, Injectable } from '@nestjs/common';
import {
  RegisterInputDTO,
  RegisterOutputDTO,
} from '../../../../../modules/auth/infra/http/dtos/register.dto';
import { IUserService } from '../../../../../modules/users/domain/services/user.service';
import { ServiceEnum } from '../../../../../shared/enums/services';
import { UserEntity } from '../../../../../modules/users/domain/entities/user.entity';
import { RepositoryEnum } from '../../../../../shared/enums/repositories';
import { IUserAuthRepository } from '../../../../../modules/auth/domain/repositories/user-auth.repository';
import { UserAuthEntity } from '../../../../../modules/auth/domain/entities/user-auth.entity';
import IHashProvider from '../../../../../modules/auth/domain/providers/hash.provider';
import { ProviderEnum } from '../../../../../shared/enums/providers';
import { UserAlreadyExistsError } from '../../../../../modules/users/application/errors/user-already-exists.error';
import { PasswordNotMatchError } from '../../errors/password-not-match.error';

@Injectable()
export class RegisterUseCase
  implements IBaseUseCase<RegisterInputDTO, RegisterOutputDTO>
{
  constructor(
    @Inject(ServiceEnum.USER)
    private readonly userService: IUserService,
    @Inject(RepositoryEnum.USER_AUTH)
    private readonly userAuthRepository: IUserAuthRepository,
    @Inject(ProviderEnum.HASH)
    private readonly hashProvider: IHashProvider,
  ) {}

  async handle({
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
  }: RegisterInputDTO): Promise<RegisterOutputDTO> {
    const hasUserByEmail = await this.userService.findByEmail(email);

    if (hasUserByEmail) throw new UserAlreadyExistsError();

    const hasUserByPhone = await this.userService.findByPhone(phone);

    if (hasUserByPhone) throw new UserAlreadyExistsError();

    if (password !== confirmPassword) throw new PasswordNotMatchError();

    const hashedPassword = await this.hashProvider.createHash(password);

    const user = new UserEntity({
      firstName,
      lastName,
      email,
      phone,
    });

    const userAuth = new UserAuthEntity({
      user,
      password: hashedPassword,
    });

    await this.userService.create(user);
    await this.userAuthRepository.create(userAuth);
  }
}
