import { IBaseUseCase } from '../../../../../shared/use-cases/base.use-case';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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

    if (hasUserByEmail) throw new BadRequestException('User already exists');

    const hasUserByPhone = await this.userService.findByPhone(phone);

    if (hasUserByPhone) throw new BadRequestException('User already exists');

    if (password !== confirmPassword)
      throw new BadRequestException('This password does not match');

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
