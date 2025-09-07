import { BadRequestException } from '@nestjs/common';

export class InvalidGroupError extends BadRequestException {
  constructor() {
    super('Invalid Group');
  }
}
