import { GroupMemberEntity } from 'src/modules/groups/domain/entities/group-member.entity';
import { TypeormGroupMemberModel } from '../models/typeorm-group-member.model';

export class TypeormGroupMemberMapper {
  static toEntity(model: TypeormGroupMemberModel): GroupMemberEntity | null {
    if (!model) return null;

    return new GroupMemberEntity({
      id: model.id,
      group: model.group,
      isAdmin: model.isAdmin,
      userId: model.userId,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toModel(entity: GroupMemberEntity): TypeormGroupMemberModel | null {
    if (!entity) return null;

    return {
      id: entity.id,
      group: entity.group,
      groupId: entity.group.id,
      isAdmin: entity.isAdmin,
      userId: entity.userId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as TypeormGroupMemberModel;
  }

  static toEntityList(list: TypeormGroupMemberModel[]): GroupMemberEntity[] {
    return list.map((model) => TypeormGroupMemberMapper.toEntity(model));
  }
}
