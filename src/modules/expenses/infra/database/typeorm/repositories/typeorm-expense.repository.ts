import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TypeormExpenseModel } from '../models/typeorm-expense.model';
import { ExpenseEntity } from '../../../../../../modules/expenses/domain/entities/expense.entity';
import { TypeormExpenseMapper } from '../mappers/typeorm-expense.mapper';
import { TypeormBaseRepository } from 'src/shared/modules/database/typeorm/typeorm-base.repository';

export class TypeormExpenseRepository extends TypeormBaseRepository<TypeormExpenseModel> {
  constructor(
    @InjectDataSource('expenses')
    dataSource: DataSource,
  ) {
    super(TypeormExpenseModel, dataSource.manager);
  }

  async findByGroupId(groupId: string): Promise<ExpenseEntity[]> {
    const models = await this.find({
      where: { groupId },
      order: { createdAt: 'DESC' },
    });

    return TypeormExpenseMapper.toEntityList(models);
  }
}
