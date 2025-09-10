import { InjectRepository } from '@nestjs/typeorm';
import { ISplitExpenseRepository } from '../../../../../../modules/expenses/domain/repositories/split-expense.repository';
import { Repository } from 'typeorm';
import { TypeormSplitExpenseModel } from '../models/typeorm-split-expense.model';
import { SplitExpenseEntity } from '../../../../../../modules/expenses/domain/entities/split-expense.entity';
import { TypeormSplitExpenseMapper } from '../mappers/typeorm-split-expense.mapper';

export class TypeormSplitExpenseRepository implements ISplitExpenseRepository {
  constructor(
    @InjectRepository(TypeormSplitExpenseModel)
    private repository: Repository<TypeormSplitExpenseModel>,
  ) {}

  async create(splits: SplitExpenseEntity[]): Promise<void> {
    const models = TypeormSplitExpenseMapper.toModelList(splits);

    await this.repository.insert(models);
  }
}
