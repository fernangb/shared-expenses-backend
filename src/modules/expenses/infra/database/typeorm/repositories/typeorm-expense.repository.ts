import { InjectRepository } from '@nestjs/typeorm';
import { IExpenseRepository } from '../../../../../../modules/expenses/domain/repositories/expense.repository';
import { Repository } from 'typeorm';
import { TypeormExpenseModel } from '../models/typeorm-expense.model';
import { ExpenseEntity } from '../../../../../../modules/expenses/domain/entities/expense.entity';
import { TypeormExpenseMapper } from '../mappers/typeorm-expense.mapper';

export class TypeormExpenseRepository implements IExpenseRepository {
  constructor(
    @InjectRepository(TypeormExpenseModel)
    private repository: Repository<TypeormExpenseModel>,
  ) {}

  async create(entity: ExpenseEntity): Promise<void> {
    const model = TypeormExpenseMapper.toModel(entity);

    await this.repository.save(this.repository.create(model));
  }
}
