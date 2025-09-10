import { Test, TestingModule } from '@nestjs/testing';
import { FindGroupExpenseUseCase } from '../find-group-expense.use-case';
import { IExpenseService } from '../../../domain/services/expense.service';
import { IExpenseRepository } from '../../../domain/repositories/expense.repository';
import { ExpenseEntity } from '../../../domain/entities/expense.entity';
import { ServiceEnum } from '../../../../../shared/enums/services';
import { RepositoryEnum } from '../../../../../shared/enums/repositories';

describe('FindGroupExpenseUseCase', () => {
  let useCase: FindGroupExpenseUseCase;
  let expenseService: IExpenseService;
  let expenseRepository: IExpenseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindGroupExpenseUseCase,
        {
          provide: ServiceEnum.EXPENSE,
          useValue: {
            validate: jest.fn(),
          },
        },
        {
          provide: RepositoryEnum.EXPENSE,
          useValue: {
            findByGroupId: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<FindGroupExpenseUseCase>(FindGroupExpenseUseCase);
    expenseService = module.get<IExpenseService>(ServiceEnum.EXPENSE);
    expenseRepository = module.get<IExpenseRepository>(RepositoryEnum.EXPENSE);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call expenseService.validate and expenseRepository.findByGroupId', async () => {
    const mockGroupId = 'group-1';
    const mockUserId = 'user-1';
    const mockExpenses: ExpenseEntity[] = [
      new ExpenseEntity({
        id: '1',
        name: 'Expense 1',
        value: 100,
        userId: mockUserId,
        groupId: mockGroupId,
      }),
    ];

    (expenseService.validate as jest.Mock).mockResolvedValue(undefined);
    (expenseRepository.findByGroupId as jest.Mock).mockResolvedValue(
      mockExpenses,
    );

    const result = await useCase.handle({
      groupId: mockGroupId,
      userId: mockUserId,
    });

    expect(expenseService.validate).toHaveBeenCalledWith(
      mockUserId,
      mockGroupId,
    );
    expect(expenseRepository.findByGroupId).toHaveBeenCalledWith(mockGroupId);
    expect(result).toEqual({ expenses: mockExpenses });
  });

  it('should propagate errors from expenseService.validate', async () => {
    const mockGroupId = 'group-1';
    const mockUserId = 'user-1';
    const error = new Error('Validation failed');

    (expenseService.validate as jest.Mock).mockRejectedValue(error);

    await expect(
      useCase.handle({ groupId: mockGroupId, userId: mockUserId }),
    ).rejects.toThrow(error);
    expect(expenseRepository.findByGroupId).not.toHaveBeenCalled();
  });

  it('should propagate errors from expenseRepository.findByGroupId', async () => {
    const mockGroupId = 'group-1';
    const mockUserId = 'user-1';
    const error = new Error('DB error');

    (expenseService.validate as jest.Mock).mockResolvedValue(undefined);
    (expenseRepository.findByGroupId as jest.Mock).mockRejectedValue(error);

    await expect(
      useCase.handle({ groupId: mockGroupId, userId: mockUserId }),
    ).rejects.toThrow(error);
  });
});
