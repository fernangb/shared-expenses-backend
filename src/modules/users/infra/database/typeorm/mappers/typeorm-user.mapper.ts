import { UserEntity } from '../../../../domain/entities/user.entity';
import { TypeormUserModel } from '../models/typeorm-user.model';

export class TypeormUserMapper {
  static toEntity(model: TypeormUserModel): UserEntity | null {
    if (!model) return null;

    return new UserEntity({
      id: model.id,
      firstName: model.firstName,
      lastName: model.lastName,
      email: model.email,
      phone: model.phone,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toModel(entity: UserEntity): TypeormUserModel | null {
    if (!entity) return null;

    return {
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      phone: entity.phone,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as TypeormUserModel;
  }
}
