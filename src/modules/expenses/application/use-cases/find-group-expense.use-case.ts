import { Inject, Injectable } from '@nestjs/common';
import { IBaseUseCase } from '../../../../shared/use-cases/base.use-case';
import { ServiceEnum } from '../../../../shared/enums/services';
import { RepositoryEnum } from '../../../../shared/enums/repositories';
import { IExpenseRepository } from '../../domain/repositories/expense.repository';
import {
  FindGroupExpenseInputDTO,
  FindGroupExpenseOutputDTO,
} from '../../infra/http/dtos/find-group-expense.dto';
import { IExpenseService } from '../../domain/services/expense.service';

@Injectable()
export class FindGroupExpenseUseCase
  implements IBaseUseCase<FindGroupExpenseInputDTO, FindGroupExpenseOutputDTO>
{
  constructor(
    @Inject(ServiceEnum.EXPENSE)
    private readonly expenseService: IExpenseService,
    @Inject(RepositoryEnum.EXPENSE)
    private readonly expenseRepository: IExpenseRepository,
  ) {}

  async handle({
    groupId,
    userId,
  }: FindGroupExpenseInputDTO): Promise<FindGroupExpenseOutputDTO> {
    await this.expenseService.validate(userId, groupId);

    const expenses = await this.expenseRepository.findByGroupId(groupId);

    return { expenses };
  }
}
