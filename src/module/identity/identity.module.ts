import { Module } from '@nestjs/common';
import { HashModule } from '../shared/module/hash/hash.module';
import { TokenModule } from '../shared/module/token/token.module';
import { RegisterService } from './core/services/register.service';
import { IdentityController } from './http/controller/identity.controller';

@Module({
  imports: [HashModule, TokenModule],
  controllers: [IdentityController],
  providers: [RegisterService],
  exports: [],
})
export class IdentityModule {}
