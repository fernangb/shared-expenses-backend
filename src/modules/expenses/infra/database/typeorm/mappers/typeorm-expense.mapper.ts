import { ExpenseEntity } from '../../../../../../modules/expenses/domain/entities/expense.entity';
import { TypeormExpenseModel } from '../models/typeorm-expense.model';

export class TypeormExpenseMapper {
  static toEntity(model: TypeormExpenseModel): ExpenseEntity | null {
    if (!model) return null;

    return new ExpenseEntity({
      id: model.id,
      groupId: model.groupId,
      userId: model.userId,
      value: model.value,
      name: model.name,
      description: model.description,
      dueDate: model.dueDate,
      paymentDate: model.paymentDate,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toModel(entity: ExpenseEntity): TypeormExpenseModel | null {
    if (!entity) return null;

    return {
      id: entity.id,
      groupId: entity.groupId,
      userId: entity.userId,
      value: entity.value,
      name: entity.name,
      description: entity.description,
      dueDate: entity.dueDate,
      paymentDate: entity.paymentDate,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as TypeormExpenseModel;
  }

  static toEntityList(list: TypeormExpenseModel[]): ExpenseEntity[] {
    return list.map((model) => TypeormExpenseMapper.toEntity(model));
  }
}
