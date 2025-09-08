import { IBaseUseCase } from '../../../../shared/use-cases/base.use-case';
import { Inject, Injectable } from '@nestjs/common';
import { RepositoryEnum } from '../../../../shared/enums/repositories';
import { IUserAuthRepository } from '../../../../modules/auth/domain/repositories/user-auth.repository';
import IHashProvider from '../../../../modules/auth/domain/providers/hash.provider';
import { ProviderEnum } from '../../../../shared/enums/providers';
import {
  LoginInputDTO,
  LoginOutputDTO,
} from '../../../../modules/auth/infra/http/dtos/login.dto';
import ITokenProvider from '../../../../modules/auth/domain/providers/token.provider';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';

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
    if (!userAuth) throw new InvalidCredentialsError();

    const isValidPassword = await this.hashProvider.compareHash(
      password,
      userAuth.password,
    );

    if (!isValidPassword) throw new InvalidCredentialsError();

    const token = this.tokenProvider.createToken(userAuth.id);

    return {
      user: userAuth.user,
      token,
    };
  }
}
