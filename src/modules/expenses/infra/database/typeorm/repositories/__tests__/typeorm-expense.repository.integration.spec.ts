import { Test, TestingModule } from '@nestjs/testing';
import { TypeormExpenseRepository } from '../typeorm-expense.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormExpenseModel } from '../../models/typeorm-expense.model';
import { ExpenseEntity } from '../../../../../../../modules/expenses/domain/entities/expense.entity';
import { Repository } from 'typeorm';

describe('TypeormExpenseRepository (integration)', () => {
  let repository: TypeormExpenseRepository;
  let typeormRepo: Repository<TypeormExpenseModel>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [TypeormExpenseModel],
          synchronize: true,
          logging: false,
        }),
        TypeOrmModule.forFeature([TypeormExpenseModel]),
      ],
      providers: [TypeormExpenseRepository],
    }).compile();

    repository = module.get<TypeormExpenseRepository>(TypeormExpenseRepository);
    typeormRepo = module.get('TypeormExpenseModelRepository');
  });

  afterEach(async () => {
    await typeormRepo.clear();
  });

  it('should persist an expense entity', async () => {
    const expense = new ExpenseEntity({
      id: 'expense-1',
      groupId: 'group-1',
      userId: 'user-1',
      name: 'Test Expense',
      description: 'Expense description',
      value: 100.5,
      dueDate: new Date('2025-09-08'),
      paymentDate: new Date('2025-09-09'),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await repository.create(expense);

    const saved = await typeormRepo.findOne({ where: { id: 'expense-1' } });
    expect(saved).toBeDefined();
    expect(saved.id).toBe(expense.id);
    expect(saved.name).toBe(expense.name);
    expect(saved.value).toBe(expense.value);
    expect(saved.groupId).toBe(expense.groupId);
    expect(saved.userId).toBe(expense.userId);
  });
});
