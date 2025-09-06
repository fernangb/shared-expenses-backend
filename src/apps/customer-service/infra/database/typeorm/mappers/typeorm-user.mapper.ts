import { UserEntity } from '../../../../domain/entities/user.entity';
import { TypeormUserModel } from '../models/typeorm-user.model';

export class TypeormUserMapper {
  static toEntity(model: TypeormUserModel): UserEntity | null {
    if (!model) return null;

    return new UserEntity({
      id: model.id,
      name: model.name,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toModel(entity: UserEntity): TypeormUserModel | null {
    if (!entity) return null;

    return {
      id: entity.id,
      name: entity.name,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as TypeormUserModel;
  }
}
