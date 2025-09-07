import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FindGroupMembersUseCase } from '../../../../../modules/groups/application/use-cases/find-group-members/find-group-members.use-case';
import { BaseErrorOutput } from '../../../../../shared/errors/base.error';

@Controller('groups')
@ApiTags('Groups')
export class FindGroupMembersController {
  constructor(private readonly useCase: FindGroupMembersUseCase) {}

  @Get('/:groupId/members/:userId')
  @ApiOperation({ summary: 'Find group members by group id' })
  @ApiResponse({
    status: 200,
    description: 'Group members found',
  })
  @ApiBadRequestResponse({
    description: 'It happens when some data is invalid',
    type: BaseErrorOutput,
  })
  async execute(
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
  ) {
    return this.useCase.handle({ groupId, userId });
  }
}
