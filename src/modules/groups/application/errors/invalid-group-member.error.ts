import { BadRequestException } from '@nestjs/common';

export class InvalidGroupMemberError extends BadRequestException {
  constructor() {
    super('Invalid Group Member');
  }
}
