import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FindUserGroupsUseCase } from '../../../application/use-cases/find-user-groups.use-case';
import { BaseErrorOutput } from '../../../../../shared/errors/base.error';

@Controller('groups')
@ApiTags('Groups')
export class FindUserGroupsController {
  constructor(private readonly useCase: FindUserGroupsUseCase) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Find groups by user' })
  @ApiResponse({
    status: 200,
    description: 'Groups found',
  })
  @ApiBadRequestResponse({
    description: 'It happens when some data is invalid',
    type: BaseErrorOutput,
  })
  async execute(@Param('userId') userId: string) {
    return this.useCase.handle({ userId });
  }
}
