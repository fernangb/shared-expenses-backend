import { BadRequestException } from '@nestjs/common';

export class AlreadyAddedError extends BadRequestException {
  constructor() {
    super('This group member is already added to this group');
  }
}
