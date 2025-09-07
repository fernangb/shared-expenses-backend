import { BadRequestException } from '@nestjs/common';

export class AddYourselfError extends BadRequestException {
  constructor() {
    super('You cannot add yourself to this group');
  }
}
