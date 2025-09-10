import { Test, TestingModule } from '@nestjs/testing';
import { CreateExpenseUseCase } from '../create-expense.use-case';
import { IExpenseService } from '../../../domain/services/expense.service';
import { IExpenseRepository } from '../../../domain/repositories/expense.repository';
import { ISplitExpenseService } from '../../../domain/services/split-expense.service';
import { ISplitExpenseRepository } from '../../../domain/repositories/split-expense.repository';
import { ExpenseEntity } from '../../../domain/entities/expense.entity';
import { SplitExpenseEntity } from '../../../domain/entities/split-expense.entity';

describe('CreateExpenseUseCase', () => {
  let useCase: CreateExpenseUseCase;
  let expenseService: IExpenseService;
  let expenseRepository: IExpenseRepository;
  let splitExpenseService: ISplitExpenseService;
  let splitExpenseRepository: ISplitExpenseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateExpenseUseCase,
        {
          provide: 'IExpenseService',
          useValue: { getGroupMembers: jest.fn() },
        },
        {
          provide: 'IExpenseRepository',
          useValue: { create: jest.fn() },
        },
        {
          provide: 'ISplitExpenseService',
          useValue: { split: jest.fn() },
        },
        {
          provide: 'ISplitExpenseRepository',
          useValue: { create: jest.fn() },
        },
      ],
    }).compile();

    useCase = module.get<CreateExpenseUseCase>(CreateExpenseUseCase);
    expenseService = module.get<IExpenseService>('IExpenseService');
    expenseRepository = module.get<IExpenseRepository>('IExpenseRepository');
    splitExpenseService = module.get<ISplitExpenseService>(
      'ISplitExpenseService',
    );
    splitExpenseRepository = module.get<ISplitExpenseRepository>(
      'ISplitExpenseRepository',
    );
  });

  it('should create an expense and splits correctly', async () => {
    const dto = {
      userId: 'user-1',
      groupId: 'group-1',
      name: 'Test Expense',
      description: 'Test description',
      value: 100,
      dueDate: new Date(),
      paymentDate: new Date(),
    };

    const groupMembers = [
      { userId: 'user-1', group: { id: 'group-1' } },
      { userId: 'user-2', group: { id: 'group-1' } },
    ];

    const splitEntities = groupMembers.map(
      (m) =>
        new SplitExpenseEntity({
          expenseId: 'expense-id',
          groupId: m.group.id,
          userId: m.userId,
          value: 50,
        }),
    );

    (expenseService.getGroupMembers as jest.Mock).mockResolvedValue(
      groupMembers,
    );
    (splitExpenseService.split as jest.Mock).mockReturnValue(splitEntities);

    await useCase.handle(dto);

    expect(expenseService.getGroupMembers).toHaveBeenCalledWith(
      'user-1',
      'group-1',
    );
    expect(splitExpenseService.split).toHaveBeenCalledWith(
      expect.any(ExpenseEntity),
      groupMembers,
    );
    expect(expenseRepository.create).toHaveBeenCalledWith(
      expect.any(ExpenseEntity),
    );
    expect(splitExpenseRepository.create).toHaveBeenCalledWith(splitEntities);
  });

  it('should throw if no group members returned', async () => {
    const dto = {
      userId: 'user-1',
      groupId: 'group-1',
      name: 'Test Expense',
      description: 'Test description',
      value: 100,
      dueDate: new Date(),
      paymentDate: new Date(),
    };

    (expenseService.getGroupMembers as jest.Mock).mockResolvedValue([]);

    const result = useCase.handle(dto);

    await expect(result).resolves.toBeUndefined();
    expect(expenseService.getGroupMembers).toHaveBeenCalledWith(
      'user-1',
      'group-1',
    );
  });
});
