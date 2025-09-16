import { Module } from '@nestjs/common';
import { HashModule } from '../shared/module/hash/hash.module';
import { TokenModule } from '../shared/module/token/token.module';
import { RegisterService } from './core/service/register.service';
import { IdentityController } from './http/controller/identity.controller';
import { LoginService } from './core/service/login.service';
import { TypeOrmUserRepository } from './database/typeorm/typeorm-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './core/entity/user.entity';

@Module({
  imports: [HashModule, TokenModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [IdentityController],
  providers: [RegisterService, LoginService, TypeOrmUserRepository],
  exports: [TypeOrmUserRepository],
})
export class IdentityModule {}
