import { BadRequestException, Injectable } from '@nestjs/common';
import { GroupMemberEntity } from '../../../../modules/groups/domain/entities/group-member.entity';
import { ExpenseEntity } from '../../domain/entities/expense.entity';
import { SplitExpenseEntity } from '../../domain/entities/split-expense.entity';
import { ISplitExpenseService } from '../../domain/services/split-expense.service';

@Injectable()
export class SplitExpenseService implements ISplitExpenseService {
  split(
    expense: ExpenseEntity,
    groupMembers: GroupMemberEntity[],
  ): SplitExpenseEntity[] {
    if (!expense) throw new BadRequestException('Invalid expense');

    if (groupMembers.length === 0)
      throw new BadRequestException('Invalid group members');

    const totalCents = Math.round(expense.value * 100);
    const sharedValue = Math.floor(totalCents / groupMembers.length);
    let remainderCents = totalCents - sharedValue * groupMembers.length;

    return groupMembers.map((member) => {
      let amount = sharedValue;

      if (remainderCents > 0) {
        amount += 1;
        remainderCents -= 1;
      }

      return new SplitExpenseEntity({
        expenseId: expense.id,
        groupId: member.group.id,
        userId: member.userId,
        value: amount / 100,
      });
    });
  }
}
