import { UserAuthEntity } from '../../../../../../modules/auth/domain/entities/user-auth.entity';
import { TypeormUserAuthModel } from '../models/typeorm-user-auth.model';

export class TypeormUserAuthMapper {
  static toEntity(model: TypeormUserAuthModel): UserAuthEntity | null {
    if (!model) return null;

    return new UserAuthEntity({
      id: model.id,
      user: model.user,
      password: model.password,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toModel(entity: UserAuthEntity): TypeormUserAuthModel | null {
    if (!entity) return null;

    return {
      id: entity.id,
      user: entity.user,
      userId: entity.user.id,
      password: entity.password,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as TypeormUserAuthModel;
  }
}
