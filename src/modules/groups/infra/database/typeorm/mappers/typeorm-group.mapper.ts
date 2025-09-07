import { GroupEntity } from '../../../../../../modules/groups/domain/entities/group.entity';
import { TypeormGroupModel } from '../models/typeorm-group.model';

export class TypeormGroupMapper {
  static toEntity(model: TypeormGroupModel): GroupEntity | null {
    if (!model) return null;

    return new GroupEntity({
      id: model.id,
      createdUserId: model.createdUserId,
      name: model.name,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toModel(entity: GroupEntity): TypeormGroupModel | null {
    if (!entity) return null;

    return {
      id: entity.id,
      createdUserId: entity.createdUserId,
      name: entity.name,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as TypeormGroupModel;
  }

  static toEntityList(list: TypeormGroupModel[]): GroupEntity[] {
    return list.map((model) => TypeormGroupMapper.toEntity(model));
  }
}
