import { SplitExpenseEntity } from '../split-expense.entity';

describe('SplitExpenseEntity', () => {
  const baseProps = {
    id: 'split-1',
    createdAt: new Date('2025-09-01T00:00:00Z'),
    updatedAt: new Date('2025-09-02T00:00:00Z'),
    expenseId: 'expense-123',
    userId: 'user-456',
    groupId: 'group-789',
    value: 50.25,
  };

  it('should return a SplitExpenseEntity', () => {
    const splitExpense = new SplitExpenseEntity(baseProps);

    expect(splitExpense).toBeInstanceOf(SplitExpenseEntity);
    expect(splitExpense.id).toBe(baseProps.id);
    expect(splitExpense.createdAt).toEqual(baseProps.createdAt);
    expect(splitExpense.updatedAt).toEqual(baseProps.updatedAt);
    expect(splitExpense.expenseId).toBe(baseProps.expenseId);
    expect(splitExpense.userId).toBe(baseProps.userId);
    expect(splitExpense.groupId).toBe(baseProps.groupId);
    expect(splitExpense.value).toBe(baseProps.value);
  });

  it('should accept integer values', () => {
    const splitExpense = new SplitExpenseEntity({ ...baseProps, value: 100 });
    expect(splitExpense.value).toBe(100);
  });

  it('should accept decimal values', () => {
    const splitExpense = new SplitExpenseEntity({ ...baseProps, value: 33.99 });
    expect(splitExpense.value).toBe(33.99);
  });

  it('should return error if has more than 2 decimals', () => {
    expect(
      () => new SplitExpenseEntity({ ...baseProps, value: 10.123 }),
    ).toThrowError('Invalid money value');
  });

  it('should return error if number is negative', () => {
    expect(
      () => new SplitExpenseEntity({ ...baseProps, value: -25 }),
    ).toThrowError('Invalid money value');
  });
});
