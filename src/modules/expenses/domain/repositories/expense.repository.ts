import { ExpenseEntity } from '../entities/expense.entity';

export interface IExpenseRepository {
  create(expense: ExpenseEntity): Promise<void>;
  findByGroupId(groupId: string): Promise<ExpenseEntity[]>;
}
