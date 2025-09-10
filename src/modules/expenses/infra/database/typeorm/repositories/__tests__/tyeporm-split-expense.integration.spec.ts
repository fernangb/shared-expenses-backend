import { Test, TestingModule } from '@nestjs/testing';
import { TypeormSplitExpenseRepository } from '../typeorm-split-expense.repository';
import { SplitExpenseEntity } from '../../../../../../../modules/expenses/domain/entities/split-expense.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeormSplitExpenseModel } from '../../models/typeorm-split-expense.model';
import { TypeormSplitExpenseMapper } from '../../mappers/typeorm-split-expense.mapper';

describe('TypeormSplitExpenseRepository (unit)', () => {
  let repository: TypeormSplitExpenseRepository;
  let typeormRepo: Repository<TypeormSplitExpenseModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeormSplitExpenseRepository,
        {
          provide: getRepositoryToken(TypeormSplitExpenseModel),
          useValue: {
            insert: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<TypeormSplitExpenseRepository>(
      TypeormSplitExpenseRepository,
    );
    typeormRepo = module.get<Repository<TypeormSplitExpenseModel>>(
      getRepositoryToken(TypeormSplitExpenseModel),
    );
  });

  it('should call repository.insert with mapped models', async () => {
    const splitEntities: SplitExpenseEntity[] = [
      new SplitExpenseEntity({
        id: 'split-1',
        expenseId: 'expense-1',
        groupId: 'group-1',
        userId: 'user-1',
        value: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      new SplitExpenseEntity({
        id: 'split-2',
        expenseId: 'expense-1',
        groupId: 'group-1',
        userId: 'user-2',
        value: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ];

    await repository.create(splitEntities);

    expect(typeormRepo.insert).toHaveBeenCalledTimes(1);
    expect(typeormRepo.insert).toHaveBeenCalledWith(
      TypeormSplitExpenseMapper.toModelList(splitEntities),
    );
  });
});
