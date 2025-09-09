import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { BaseErrorOutput } from '../../../../../shared/errors/base.error';
import { CreateExpenseUseCase } from '../../../../../modules/expenses/application/use-cases/create-expense.use-case';
import { CreateExpenseInputDTO } from '../dtos/create-expense.dto';

@Controller('expenses')
@ApiTags('Expenses')
export class CreateExpenseController {
  constructor(private readonly useCase: CreateExpenseUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create an expense' })
  @ApiResponse({
    status: 201,
    description: 'Created expense',
  })
  @ApiBadRequestResponse({
    description: 'It happens when some data is invalid',
    type: BaseErrorOutput,
  })
  async create(@Body() createUserDto: CreateExpenseInputDTO): Promise<void> {
    await this.useCase.handle(createUserDto);
  }
}
