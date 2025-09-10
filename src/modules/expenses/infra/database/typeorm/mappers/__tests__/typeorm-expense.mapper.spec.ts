import { TypeormExpenseMapper } from '../typeorm-expense.mapper';
import { ExpenseEntity } from '../../../../../../../modules/expenses/domain/entities/expense.entity';
import { TypeormExpenseModel } from '../../models/typeorm-expense.model';

describe('TypeormExpenseMapper', () => {
  const expenseModel: TypeormExpenseModel = {
    id: 'expense-1',
    groupId: 'group-1',
    userId: 'user-1',
    value: 100,
    name: 'Test Expense',
    description: 'Test description',
    dueDate: new Date(),
    paymentDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const expenseEntity = new ExpenseEntity({
    id: 'expense-1',
    groupId: 'group-1',
    userId: 'user-1',
    value: 100,
    name: 'Test Expense',
    description: 'Test description',
    dueDate: expenseModel.dueDate,
    paymentDate: expenseModel.paymentDate,
    createdAt: expenseModel.createdAt,
    updatedAt: expenseModel.updatedAt,
  });

  describe('toEntity', () => {
    it('should map model to entity', () => {
      const entity = TypeormExpenseMapper.toEntity(expenseModel);
      expect(entity).toBeInstanceOf(ExpenseEntity);
      expect(entity).toEqual(expenseEntity);
    });

    it('should return null if model is null', () => {
      const entity = TypeormExpenseMapper.toEntity(null);
      expect(entity).toBeNull();
    });
  });

  describe('toModel', () => {
    it('should map entity to model', () => {
      const model = TypeormExpenseMapper.toModel(expenseEntity);
      expect(model).toEqual(expenseModel);
    });

    it('should return null if entity is null', () => {
      const model = TypeormExpenseMapper.toModel(null);
      expect(model).toBeNull();
    });
  });

  describe('toEntityList', () => {
    it('should map a list of models to entities', () => {
      const list = TypeormExpenseMapper.toEntityList([expenseModel]);
      expect(list).toHaveLength(1);
      expect(list[0]).toBeInstanceOf(ExpenseEntity);
      expect(list[0]).toEqual(expenseEntity);
    });

    it('should return an empty array if input list is empty', () => {
      const list = TypeormExpenseMapper.toEntityList([]);
      expect(list).toEqual([]);
    });
  });
});
