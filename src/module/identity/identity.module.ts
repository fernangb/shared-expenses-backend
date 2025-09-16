import { Module } from '@nestjs/common';
import { HashModule } from '../shared/module/hash/hash.module';
import { TokenModule } from '../shared/module/token/token.module';
import { RegisterService } from './core/service/register.service';
import { IdentityController } from './http/controller/identity.controller';
import { LoginService } from './core/service/login.service';

@Module({
  imports: [HashModule, TokenModule],
  controllers: [IdentityController],
  providers: [RegisterService, LoginService],
  exports: [],
})
export class IdentityModule {}
