import { BadRequestException } from '@nestjs/common';

export class GroupNotExistsError extends BadRequestException {
  constructor() {
    super('Group not exists');
  }
}
