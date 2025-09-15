import { ExpenseEntity } from 'src/modules/expenses/domain/entities/expense.entity';
import { TypeormBaseModel } from 'src/shared/modules/database/typeorm/typeorm-base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'expenses' })
export class TypeormExpenseModel extends TypeormBaseModel<ExpenseEntity> {
  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'group_id' })
  groupId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  value: number;

  @Column({ name: 'due_date', nullable: true })
  dueDate?: Date;

  @Column({ name: 'payment_date', nullable: true })
  paymentDate?: Date;
}
