import { BadRequestException } from '@nestjs/common';

export class UserNotExistsError extends BadRequestException {
  constructor() {
    super('User not exists');
  }
}
