import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormUserAuthModel } from '../database/typeorm/models/typeorm-user-auth.model';
import { HashModule } from '../providers/hash/hash.module';
import { RegisterController } from './controllers/register.controller';
import { RegisterUseCase } from '../../application/use-cases/register/register.use-case';
import { TypeormUserAuthRepository } from '../database/typeorm/repositories/typeorm-user-auth.repository';
import { RepositoryEnum } from 'src/shared/enums/repositories';
import { ProviderEnum } from 'src/shared/enums/providers';
import BCryptHashProvider from '../providers/hash/bcrypt-hash.provider';
import { UserModule } from 'src/modules/customers/infra/http/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeormUserAuthModel]),
    UserModule,
    HashModule,
  ],
  controllers: [RegisterController],
  providers: [
    RegisterUseCase,
    {
      provide: RepositoryEnum.USER_AUTH,
      useClass: TypeormUserAuthRepository,
    },
    {
      provide: ProviderEnum.HASH,
      useClass: BCryptHashProvider,
    },
  ],
  exports: [],
})
export class AuthModule {}
