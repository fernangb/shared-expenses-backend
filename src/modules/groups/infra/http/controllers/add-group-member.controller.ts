import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AddGroupMemberUseCase } from 'src/modules/groups/application/use-cases/add-member/add-group-member.use-case';
import { AddGroupMemberInputDTO } from '../dtos/add-group-member.dto';

@Controller('groups')
@ApiTags('Group')
export class AddGroupMemberController {
  constructor(private readonly useCase: AddGroupMemberUseCase) {}

  @Post('/members')
  @ApiOperation({ summary: 'Add a group member' })
  @ApiResponse({
    status: 201,
    description: 'User added to group',
  })
  @ApiBadRequestResponse({
    description: 'It happens when some data is invalid',
  })
  async create(@Body() dto: AddGroupMemberInputDTO): Promise<void> {
    await this.useCase.handle(dto);
  }
}
