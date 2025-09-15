import { SplitExpenseEntity } from 'src/modules/expenses/domain/entities/split-expense.entity';
import { TypeormBaseModel } from 'src/shared/modules/database/typeorm/typeorm-base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'split_expenses' })
export class TypeormSplitExpenseModel extends TypeormBaseModel<SplitExpenseEntity> {
  @Column({ name: 'expense_id' })
  expenseId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'group_id' })
  groupId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  value: number;
}
