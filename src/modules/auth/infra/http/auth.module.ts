import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormUserAuthModel } from '../database/typeorm/models/typeorm-user-auth.model';
import { HashModule } from '../providers/hash/hash.module';
import { RegisterController } from './controllers/register.controller';
import { RegisterUseCase } from '../../application/use-cases/register/register.use-case';
import { TypeormUserAuthRepository } from '../database/typeorm/repositories/typeorm-user-auth.repository';
import { RepositoryEnum } from '../../../../shared/enums/repositories';
import { ProviderEnum } from '../../../../shared/enums/providers';
import BCryptHashProvider from '../providers/hash/bcrypt-hash.provider';
import { TokenModule } from '../providers/token/token.module';
import JSONWebTokenProvider from '../providers/token/json-web-token.provider';
import { LoginController } from './controllers/login.controller';
import { LoginUseCase } from '../../application/use-cases/login/login.use-case';
import { UserModule } from '../../../../modules/users/infra/http/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeormUserAuthModel]),
    UserModule,
    HashModule,
    TokenModule,
  ],
  controllers: [LoginController, RegisterController],
  providers: [
    LoginUseCase,
    RegisterUseCase,
    {
      provide: RepositoryEnum.USER_AUTH,
      useClass: TypeormUserAuthRepository,
    },
    {
      provide: ProviderEnum.HASH,
      useClass: BCryptHashProvider,
    },
    {
      provide: ProviderEnum.TOKEN,
      useClass: JSONWebTokenProvider,
    },
  ],
  exports: [],
})
export class AuthModule {}
