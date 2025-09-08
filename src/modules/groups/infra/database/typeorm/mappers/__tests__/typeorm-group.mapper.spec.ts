import { TypeormGroupMapper } from '../typeorm-group.mapper';
import { TypeormGroupModel } from '../../models/typeorm-group.model';
import { GroupEntity } from '../../../../../../../modules/groups/domain/entities/group.entity';

describe('TypeormGroupMapper', () => {
  const now = new Date();

  const model: TypeormGroupModel = {
    id: 'group-id',
    createdUserId: 'user-id',
    name: 'Test Group',
    createdAt: now,
    updatedAt: now,
  };

  const entity = new GroupEntity({
    id: 'group-id',
    createdUserId: 'user-id',
    name: 'Test Group',
    createdAt: now,
    updatedAt: now,
  });

  describe('toEntity', () => {
    it('should return null if model is null', () => {
      expect(TypeormGroupMapper.toEntity(null)).toBeNull();
    });

    it('should map model to entity correctly', () => {
      const result = TypeormGroupMapper.toEntity(model);
      expect(result).toEqual(entity);
    });
  });

  describe('toModel', () => {
    it('should return null if entity is null', () => {
      expect(TypeormGroupMapper.toModel(null)).toBeNull();
    });

    it('should map entity to model correctly', () => {
      const result = TypeormGroupMapper.toModel(entity);
      expect(result).toEqual(model);
    });
  });

  describe('toEntityList', () => {
    it('should map list of models to entities', () => {
      const result = TypeormGroupMapper.toEntityList([model]);
      expect(result).toEqual([entity]);
    });

    it('should handle empty list', () => {
      const result = TypeormGroupMapper.toEntityList([]);
      expect(result).toEqual([]);
    });
  });
});
