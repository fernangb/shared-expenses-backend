import { TypeormSplitExpenseMapper } from '../typeorm-split-expense.mapper';
import { SplitExpenseEntity } from '../../../../../../../modules/expenses/domain/entities/split-expense.entity';
import { TypeormSplitExpenseModel } from '../../models/typeorm-split-expense.model';

describe('TypeormSplitExpenseMapper', () => {
  const splitExpenseModel: TypeormSplitExpenseModel = {
    id: 'split-1',
    groupId: 'group-1',
    userId: 'user-1',
    expenseId: 'expense-1',
    value: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const splitExpenseEntity = new SplitExpenseEntity({
    id: 'split-1',
    groupId: 'group-1',
    userId: 'user-1',
    expenseId: 'expense-1',
    value: 50,
    createdAt: splitExpenseModel.createdAt,
    updatedAt: splitExpenseModel.updatedAt,
  });

  describe('toEntity', () => {
    it('should map model to entity', () => {
      const entity = TypeormSplitExpenseMapper.toEntity(splitExpenseModel);
      expect(entity).toBeInstanceOf(SplitExpenseEntity);
      expect(entity).toEqual(splitExpenseEntity);
    });

    it('should return null if model is null', () => {
      const entity = TypeormSplitExpenseMapper.toEntity(null);
      expect(entity).toBeNull();
    });
  });

  describe('toModel', () => {
    it('should map entity to model', () => {
      const model = TypeormSplitExpenseMapper.toModel(splitExpenseEntity);
      expect(model).toEqual(splitExpenseModel);
    });

    it('should return null if entity is null', () => {
      const model = TypeormSplitExpenseMapper.toModel(null);
      expect(model).toBeNull();
    });
  });

  describe('toEntityList', () => {
    it('should map a list of models to entities', () => {
      const list = TypeormSplitExpenseMapper.toEntityList([splitExpenseModel]);
      expect(list).toHaveLength(1);
      expect(list[0]).toBeInstanceOf(SplitExpenseEntity);
      expect(list[0]).toEqual(splitExpenseEntity);
    });

    it('should return an empty array if input list is empty', () => {
      const list = TypeormSplitExpenseMapper.toEntityList([]);
      expect(list).toEqual([]);
    });
  });

  describe('toModelList', () => {
    it('should map a list of entities to models', () => {
      const list = TypeormSplitExpenseMapper.toModelList([splitExpenseEntity]);
      expect(list).toHaveLength(1);
      expect(list[0]).toEqual(splitExpenseModel);
    });

    it('should return an empty array if input list is empty', () => {
      const list = TypeormSplitExpenseMapper.toModelList([]);
      expect(list).toEqual([]);
    });
  });
});
