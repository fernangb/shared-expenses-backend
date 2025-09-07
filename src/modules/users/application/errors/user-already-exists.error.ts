import { BadRequestException } from '@nestjs/common';

export class UserAlreadyExistsError extends BadRequestException {
  constructor() {
    super('User already exists');
  }
}
