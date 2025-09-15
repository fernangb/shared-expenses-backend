import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TypeormSplitExpenseModel } from '../models/typeorm-split-expense.model';
import { TypeormBaseRepository } from 'src/shared/modules/database/typeorm/typeorm-base.repository';

export class TypeormSplitExpenseRepository extends TypeormBaseRepository<TypeormSplitExpenseModel> {
  constructor(
    @InjectDataSource('split_expenses')
    dataSource: DataSource,
  ) {
    super(TypeormSplitExpenseModel, dataSource.manager);
  }
}
