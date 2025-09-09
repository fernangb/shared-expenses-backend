import { SplitExpenseEntity } from '../../../../../../modules/expenses/domain/entities/split-expense.entity';
import { TypeormSplitExpenseModel } from '../models/typeorm-split-expense.model';

export class TypeormSplitExpenseMapper {
  static toEntity(model: TypeormSplitExpenseModel): SplitExpenseEntity | null {
    if (!model) return null;

    return new SplitExpenseEntity({
      id: model.id,
      groupId: model.groupId,
      userId: model.userId,
      expenseId: model.expenseId,
      value: model.value,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toModel(entity: SplitExpenseEntity): TypeormSplitExpenseModel | null {
    if (!entity) return null;

    return {
      id: entity.id,
      groupId: entity.groupId,
      userId: entity.userId,
      value: entity.value,
      expenseId: entity.expenseId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as TypeormSplitExpenseModel;
  }

  static toEntityList(list: TypeormSplitExpenseModel[]): SplitExpenseEntity[] {
    return list.map((model) => TypeormSplitExpenseMapper.toEntity(model));
  }

  static toModelList(list: SplitExpenseEntity[]): TypeormSplitExpenseModel[] {
    return list.map((entity) => TypeormSplitExpenseMapper.toModel(entity));
  }
}
