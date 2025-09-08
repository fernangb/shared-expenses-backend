import { TypeormGroupMemberMapper } from '../typeorm-group-member.mapper';
import { TypeormGroupMemberModel } from '../../models/typeorm-group-member.model';
import { GroupMemberEntity } from '../../../../../../../modules/groups/domain/entities/group-member.entity';

describe('TypeormGroupMemberMapper', () => {
  const now = new Date();

  const model: TypeormGroupMemberModel = {
    id: 'member-id',
    group: { id: 'group-id', name: 'Test Group' } as any,
    groupId: 'group-id',
    isAdmin: true,
    userId: 'user-id',
    createdAt: now,
    updatedAt: now,
  };

  const entity = new GroupMemberEntity({
    id: 'member-id',
    group: { id: 'group-id', name: 'Test Group' } as any,
    isAdmin: true,
    userId: 'user-id',
    createdAt: now,
    updatedAt: now,
  });

  describe('toEntity', () => {
    it('should return null if model is null', () => {
      expect(TypeormGroupMemberMapper.toEntity(null)).toBeNull();
    });

    it('should map model to entity correctly', () => {
      const result = TypeormGroupMemberMapper.toEntity(model);
      expect(result).toEqual(entity);
    });
  });

  describe('toModel', () => {
    it('should return null if entity is null', () => {
      expect(TypeormGroupMemberMapper.toModel(null)).toBeNull();
    });

    it('should map entity to model correctly', () => {
      const result = TypeormGroupMemberMapper.toModel(entity);
      expect(result).toEqual(model);
    });
  });

  describe('toEntityList', () => {
    it('should map list of models to entities', () => {
      const result = TypeormGroupMemberMapper.toEntityList([model]);
      expect(result).toEqual([entity]);
    });

    it('should handle empty list', () => {
      const result = TypeormGroupMemberMapper.toEntityList([]);
      expect(result).toEqual([]);
    });
  });
});
