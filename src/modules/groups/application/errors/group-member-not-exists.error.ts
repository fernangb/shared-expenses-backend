import { BadRequestException } from '@nestjs/common';

export class GroupMemberNotExistsError extends BadRequestException {
  constructor() {
    super('Group member not exists');
  }
}
