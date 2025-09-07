import { BadRequestException } from '@nestjs/common';

export class OnlyAdminCanAddUserError extends BadRequestException {
  constructor() {
    super('Only admin can add a user');
  }
}
