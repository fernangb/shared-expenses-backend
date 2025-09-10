import { SplitExpenseEntity } from '../entities/split-expense.entity';

export interface ISplitExpenseRepository {
  create(splits: SplitExpenseEntity[]): Promise<void>;
}
