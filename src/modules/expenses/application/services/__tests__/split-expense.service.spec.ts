import { SplitExpenseService } from '../split-expense.service';
import { BadRequestException } from '@nestjs/common';
import { ExpenseEntity } from '../../../domain/entities/expense.entity';
import { GroupMemberEntity } from '../../../../../modules/groups/domain/entities/group-member.entity';
import { SplitExpenseEntity } from '../../../domain/entities/split-expense.entity';

describe('SplitExpenseService', () => {
  let service: SplitExpenseService;

  const makeExpense = (value: number): ExpenseEntity =>
    new ExpenseEntity({
      id: 'expense-1',
      name: 'Test Expense',
      value,
      userId: 'user-1',
      groupId: 'group-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

  const makeGroupMembers = (count: number): GroupMemberEntity[] =>
    Array.from({ length: count }).map((_, i) => {
      return new GroupMemberEntity({
        id: `member-${i + 1}`,
        userId: `user-${i + 1}`,
        group: { id: 'group-1' } as any,
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

  beforeEach(() => {
    service = new SplitExpenseService();
  });

  it('should throw an error if expense is invalid', () => {
    expect(() => service.split(null as any, makeGroupMembers(2))).toThrow(
      BadRequestException,
    );
  });

  it('should throw an error if groupMembers is empty', () => {
    expect(() => service.split(makeExpense(100), [])).toThrow(
      BadRequestException,
    );
  });

  it('should split evenly when there is no remainder', () => {
    const expense = makeExpense(100);
    const members = makeGroupMembers(4);

    const result = service.split(expense, members);

    expect(result).toHaveLength(4);
    result.forEach((split) => {
      expect(split.value).toBe(25);
    });
  });

  it('should distribute remainder correctly among first members', () => {
    const expense = makeExpense(100);
    const members = makeGroupMembers(3);

    const result = service.split(expense, members);
    const total = result.reduce((sum, s) => sum + s.value, 0);

    expect(total).toBe(100);
    expect(result[0].value).toBeCloseTo(33.34, 2);
    expect(result[1].value).toBeCloseTo(33.33, 2);
    expect(result[2].value).toBeCloseTo(33.33, 2);
  });

  it('should ensure that total split equals the original expense value', () => {
    const expense = makeExpense(99.99);
    const members = makeGroupMembers(7);

    const result = service.split(expense, members);

    const total = result.reduce((sum, s) => sum + s.value, 0);
    expect(total).toBeCloseTo(expense.value, 2);
  });

  it('should create valid SplitExpenseEntity instances', () => {
    const expense = makeExpense(50);
    const members = makeGroupMembers(2);

    const result = service.split(expense, members);

    result.forEach((split) => {
      expect(split).toBeInstanceOf(SplitExpenseEntity);
      expect(split.expenseId).toBe(expense.id);
      expect(split.groupId).toBe(members[0].group.id);
      expect(typeof split.value).toBe('number');
    });
  });
});
