import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { BaseErrorOutput } from '../../../../../shared/errors/base.error';
import { FindGroupExpenseUseCase } from '../../../../../modules/expenses/application/use-cases/find-group-expense.use-case';

@Controller('expenses')
@ApiTags('Expenses')
export class FindGroupExpenseController {
  constructor(private readonly useCase: FindGroupExpenseUseCase) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Find expenses per group' })
  @ApiResponse({
    status: 200,
    description: 'Expenses found',
  })
  @ApiBadRequestResponse({
    description: 'It happens when some data is invalid',
    type: BaseErrorOutput,
  })
  async execute(
    @Param('userId') userId: string,
    @Query('groupId') groupId: string,
  ) {
    return this.useCase.handle({ groupId, userId });
  }
}
