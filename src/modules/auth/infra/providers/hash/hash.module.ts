import { Module } from '@nestjs/common';
import BCryptHashProvider from './bcrypt-hash.provider';

@Module({
  imports: [],
  providers: [BCryptHashProvider],
  exports: [BCryptHashProvider],
})
export class HashModule {}
