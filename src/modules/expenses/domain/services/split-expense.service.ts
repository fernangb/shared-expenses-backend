import { GroupMemberEntity } from '../../../../modules/groups/domain/entities/group-member.entity';
import { ExpenseEntity } from '../entities/expense.entity';
import { SplitExpenseEntity } from '../entities/split-expense.entity';

export interface ISplitExpenseService {
  split(
    expense: ExpenseEntity,
    groupMembers: GroupMemberEntity[],
  ): SplitExpenseEntity[];
}
