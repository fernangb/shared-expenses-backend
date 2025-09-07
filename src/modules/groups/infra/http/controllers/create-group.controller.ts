import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CreateGroupUseCase } from '../../../application/use-cases/create-group/create-group.use-case';
import { CreateGroupInputDTO } from '../dtos/create-group.dto';
import { BaseErrorOutput } from '../../../../../shared/errors/base.error';

@Controller('groups')
@ApiTags('Groups')
export class CreateGroupController {
  constructor(private readonly useCase: CreateGroupUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create a group' })
  @ApiResponse({
    status: 201,
    description: 'Created group',
  })
  @ApiBadRequestResponse({
    description: 'It happens when some data is invalid',
    type: BaseErrorOutput,
  })
  async create(@Body() createUserDto: CreateGroupInputDTO): Promise<void> {
    await this.useCase.handle(createUserDto);
  }
}
