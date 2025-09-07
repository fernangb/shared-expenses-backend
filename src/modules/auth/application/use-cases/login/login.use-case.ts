import { IBaseUseCase } from 'src/shared/use-cases/base.use-case';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RepositoryEnum } from 'src/shared/enums/repositories';
import { IUserAuthRepository } from 'src/modules/auth/domain/repositories/user-auth.repository';
import IHashProvider from 'src/modules/auth/domain/providers/hash.provider';
import { ProviderEnum } from 'src/shared/enums/providers';
import {
  LoginInputDTO,
  LoginOutputDTO,
} from 'src/modules/auth/infra/http/dtos/login.dto';
import ITokenProvider from 'src/modules/auth/domain/providers/token.provider';

@Injectable()
export class LoginUseCase
  implements IBaseUseCase<LoginInputDTO, LoginOutputDTO>
{
  constructor(
    @Inject(RepositoryEnum.USER_AUTH)
    private readonly userAuthRepository: IUserAuthRepository,
    @Inject(ProviderEnum.HASH)
    private readonly hashProvider: IHashProvider,
    @Inject(ProviderEnum.TOKEN)
    private readonly tokenProvider: ITokenProvider,
  ) {}

  async handle({ email, password }: LoginInputDTO): Promise<LoginOutputDTO> {
    const userAuth = await this.userAuthRepository.findByEmail(email);
    if (!userAuth) throw new BadRequestException('Invalid credentials');

    const isValidPassword = await this.hashProvider.compareHash(
      password,
      userAuth.password,
    );

    if (!isValidPassword) throw new BadRequestException('Invalid credentials');

    const token = this.tokenProvider.createToken(userAuth.id);

    return {
      user: userAuth.user,
      token,
    };
  }
}
