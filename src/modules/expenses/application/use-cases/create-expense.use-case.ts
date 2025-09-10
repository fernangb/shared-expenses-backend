import { Inject, Injectable } from '@nestjs/common';
import { IBaseUseCase } from '../../../../shared/use-cases/base.use-case';
import {
  CreateExpenseInputDTO,
  CreateExpenseOutputDTO,
} from '../../infra/http/dtos/create-expense.dto';
import { ServiceEnum } from '../../../../shared/enums/services';
import { RepositoryEnum } from '../../../../shared/enums/repositories';
import { IExpenseRepository } from '../../domain/repositories/expense.repository';
import { ExpenseEntity } from '../../domain/entities/expense.entity';
import { ISplitExpenseService } from '../../domain/services/split-expense.service';
import { ISplitExpenseRepository } from '../../domain/repositories/split-expense.repository';
import { IExpenseService } from '../../domain/services/expense.service';

@Injectable()
export class CreateExpenseUseCase
  implements IBaseUseCase<CreateExpenseInputDTO, CreateExpenseOutputDTO>
{
  constructor(
    @Inject(ServiceEnum.EXPENSE)
    private readonly expenseService: IExpenseService,
    @Inject(RepositoryEnum.EXPENSE)
    private readonly expenseRepository: IExpenseRepository,
    @Inject(ServiceEnum.SPLIT_EXPENSE)
    private readonly splitExpenseService: ISplitExpenseService,
    @Inject(RepositoryEnum.SPLIT_EXPENSE)
    private readonly splitExpenseRepository: ISplitExpenseRepository,
  ) {}

  async handle({
    userId,
    name,
    description,
    dueDate,
    groupId,
    paymentDate,
    value,
  }: CreateExpenseInputDTO): Promise<CreateExpenseOutputDTO> {
    const groupMembers = await this.expenseService.getGroupMembers(
      userId,
      groupId,
    );

    const expense = new ExpenseEntity({
      userId,
      groupId,
      name,
      description,
      value,
      dueDate,
      paymentDate,
    });

    const splits = this.splitExpenseService.split(expense, groupMembers);

    await this.expenseRepository.create(expense);
    await this.splitExpenseRepository.create(splits);
  }
}
