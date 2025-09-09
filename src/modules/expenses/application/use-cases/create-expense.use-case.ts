import { Inject, Injectable } from '@nestjs/common';
import { IBaseUseCase } from '../../../../shared/use-cases/base.use-case';
import {
  CreateExpenseInputDTO,
  CreateExpenseOutputDTO,
} from '../../infra/http/dtos/create-expense.dto';
import { ServiceEnum } from '../../../../shared/enums/services';
import { RepositoryEnum } from '../../../../shared/enums/repositories';
import { IUserService } from '../../../../modules/users/domain/services/user.service';
import { IExpenseRepository } from '../../domain/repositories/expense.repository';
import { IGroupService } from '../../../../modules/groups/domain/services/group.service';
import { IGroupMemberService } from '../../../../modules/groups/domain/services/group-member.service';
import { UserNotExistsError } from '../../../../modules/users/application/errors/user-not-exists.error';
import { GroupNotExistsError } from '../../../../modules/groups/application/errors/group-not-exists.error';
import { ExpenseEntity } from '../../domain/entities/expense.entity';
import { InvalidGroupError } from '../../../../modules/groups/application/errors/inavlid-group.error';
import { ISplitExpenseService } from '../../domain/services/split-expense.service';
import { ISplitExpenseRepository } from '../../domain/repositories/split-expense.repository';

@Injectable()
export class CreateExpenseUseCase
  implements IBaseUseCase<CreateExpenseInputDTO, CreateExpenseOutputDTO>
{
  constructor(
    @Inject(ServiceEnum.USER)
    private readonly userService: IUserService,
    @Inject(RepositoryEnum.EXPENSE)
    private readonly expenseRepository: IExpenseRepository,
    @Inject(ServiceEnum.GROUP)
    private readonly groupService: IGroupService,
    @Inject(ServiceEnum.GROUP_MEMBER)
    private readonly groupMemberService: IGroupMemberService,
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
    const user = await this.userService.findById(userId);
    if (!user) throw new UserNotExistsError();

    const group = await this.groupService.findById(groupId);
    if (!group) throw new GroupNotExistsError();

    const groupMembers = await this.groupMemberService.findByGroupId(groupId);
    const isMember = groupMembers.find((member) => member.userId === userId);

    if (!isMember) throw new InvalidGroupError();

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
