import { BadRequestException } from '@nestjs/common';

export class PasswordNotMatchError extends BadRequestException {
  constructor() {
    super('Password not match');
  }
}
