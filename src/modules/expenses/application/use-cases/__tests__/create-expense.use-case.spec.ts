import { CreateExpenseUseCase } from '../create-expense.use-case';
import { UserNotExistsError } from '../../../../../modules/users/application/errors/user-not-exists.error';
import { GroupNotExistsError } from '../../../../../modules/groups/application/errors/group-not-exists.error';
import { InvalidGroupError } from '../../../../../modules/groups/application/errors/inavlid-group.error';
import { ExpenseEntity } from '../../../domain/entities/expense.entity';

describe('CreateExpenseUseCase', () => {
  let useCase: CreateExpenseUseCase;

  const mockUserService = { findById: jest.fn() };
  const mockExpenseRepository = { create: jest.fn() };
  const mockGroupService = { findById: jest.fn() };
  const mockGroupMemberService = { findByGroupId: jest.fn() };
  const mockSplitExpenseService = { split: jest.fn() };
  const mockSplitExpenseRepository = { create: jest.fn() };

  const inputDto = {
    userId: 'user-1',
    groupId: 'group-1',
    name: 'Test Expense',
    description: 'Test description',
    value: 100,
    dueDate: new Date(),
    paymentDate: new Date(),
  };

  const groupMembersMock = [
    { userId: 'user-1', group: { id: 'group-1' } },
    { userId: 'user-2', group: { id: 'group-1' } },
  ];

  beforeEach(() => {
    useCase = new CreateExpenseUseCase(
      mockUserService as any,
      mockExpenseRepository as any,
      mockGroupService as any,
      mockGroupMemberService as any,
      mockSplitExpenseService as any,
      mockSplitExpenseRepository as any,
    );

    jest.clearAllMocks();
  });

  it('should throw UserNotExistsError if user not found', async () => {
    mockUserService.findById.mockResolvedValue(null);

    await expect(useCase.handle(inputDto)).rejects.toThrow(UserNotExistsError);
  });

  it('should throw GroupNotExistsError if group not found', async () => {
    mockUserService.findById.mockResolvedValue({ id: 'user-1' });
    mockGroupService.findById.mockResolvedValue(null);

    await expect(useCase.handle(inputDto)).rejects.toThrow(GroupNotExistsError);
  });

  it('should throw InvalidGroupError if user is not a group member', async () => {
    mockUserService.findById.mockResolvedValue({ id: 'user-1' });
    mockGroupService.findById.mockResolvedValue({ id: 'group-1' });
    mockGroupMemberService.findByGroupId.mockResolvedValue([
      { userId: 'user-2', group: { id: 'group-1' } },
    ]);

    await expect(useCase.handle(inputDto)).rejects.toThrow(InvalidGroupError);
  });

  it('should create expense and split expenses if valid', async () => {
    mockUserService.findById.mockResolvedValue({ id: 'user-1' });
    mockGroupService.findById.mockResolvedValue({ id: 'group-1' });
    mockGroupMemberService.findByGroupId.mockResolvedValue(groupMembersMock);
    mockSplitExpenseService.split.mockReturnValue([
      {
        userId: 'user-1',
        groupId: 'group-1',
        expenseId: 'expense-1',
        value: 50,
      },
      {
        userId: 'user-2',
        groupId: 'group-1',
        expenseId: 'expense-1',
        value: 50,
      },
    ]);

    await useCase.handle(inputDto);

    expect(mockExpenseRepository.create).toHaveBeenCalledTimes(1);
    expect(mockSplitExpenseRepository.create).toHaveBeenCalledTimes(1);

    const createdExpense = mockExpenseRepository.create.mock.calls[0][0];
    expect(createdExpense).toBeInstanceOf(ExpenseEntity);
    expect(createdExpense.value).toBe(inputDto.value);
  });
});
