import { ExpenseEntity } from '../expense.entity';

describe('ExpenseEntity', () => {
  const baseProps = {
    id: '123',
    createdAt: new Date('2025-09-01T00:00:00Z'),
    updatedAt: new Date('2025-09-02T00:00:00Z'),
    name: 'Aluguel',
    description: 'Pagamento mensal',
    value: 1500.5,
    dueDate: new Date('2025-09-10T00:00:00Z'),
    paymentDate: new Date('2025-09-09T00:00:00Z'),
    userId: 'user-1',
    groupId: 'group-1',
  };

  it('should create ExpenseEntity', () => {
    const expense = new ExpenseEntity(baseProps);

    expect(expense).toBeInstanceOf(ExpenseEntity);
    expect(expense.id).toBe(baseProps.id);
    expect(expense.createdAt).toEqual(baseProps.createdAt);
    expect(expense.updatedAt).toEqual(baseProps.updatedAt);
    expect(expense.name).toBe(baseProps.name);
    expect(expense.description).toBe(baseProps.description);
    expect(expense.value).toBe(baseProps.value);
    expect(expense.dueDate).toEqual(baseProps.dueDate);
    expect(expense.paymentDate).toEqual(baseProps.paymentDate);
    expect(expense.userId).toBe(baseProps.userId);
    expect(expense.groupId).toBe(baseProps.groupId);
  });

  it('should accept integer values', () => {
    const expense = new ExpenseEntity({ ...baseProps, value: 2000 });
    expect(expense.value).toBe(2000);
  });

  it('should accept decimal values', () => {
    const expense = new ExpenseEntity({ ...baseProps, value: 99.99 });
    expect(expense.value).toBe(99.99);
  });

  it('should return error if has more than 2 decimals', () => {
    expect(
      () => new ExpenseEntity({ ...baseProps, value: 10.123 }),
    ).toThrowError('Invalid money value');
  });

  it('should return error if number is negative', () => {
    expect(() => new ExpenseEntity({ ...baseProps, value: -50 })).toThrowError(
      'Invalid money value',
    );
  });
});
