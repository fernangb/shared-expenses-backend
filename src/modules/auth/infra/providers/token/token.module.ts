import { Module } from '@nestjs/common';
import JSONWebTokenProvider from './json-web-token.provider';

@Module({
  imports: [],
  providers: [JSONWebTokenProvider],
  exports: [JSONWebTokenProvider],
})
export class TokenModule {}
