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

  describe('create', () => {
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

  describe('findByGroupId', () => {
    it('should return expenses for a given groupId in descending order of creation', async () => {
      const now = new Date();

      const expense1 = repository['repository'].create({
        id: '1',
        groupId: 'group-1',
        userId: 'user-1',
        name: 'Expense 1',
        value: 100,
        description: 'Desc 1',
        createdAt: new Date(now.getTime() - 1000),
        updatedAt: new Date(now.getTime() - 1000),
      });

      const expense2 = repository['repository'].create({
        id: '2',
        groupId: 'group-1',
        userId: 'user-2',
        name: 'Expense 2',
        value: 200,
        description: 'Desc 2',
        createdAt: now,
        updatedAt: now,
      });

      await repository['repository'].save([expense1, expense2]);

      const result: ExpenseEntity[] = await repository.findByGroupId('group-1');

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('2');
      expect(result[1].id).toBe('1');
      expect(result.every((e) => e instanceof ExpenseEntity)).toBe(true);
    });

    it('should return empty array if no expenses found', async () => {
      const result = await repository.findByGroupId('non-existent-group');
      expect(result).toEqual([]);
    });
  });
});
