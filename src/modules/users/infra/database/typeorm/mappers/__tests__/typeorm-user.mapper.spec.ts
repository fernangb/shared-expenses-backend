import { TypeormUserMapper } from '../typeorm-user.mapper';
import { TypeormUserModel } from '../../models/typeorm-user.model';
import { UserEntity } from '../../../../../domain/entities/user.entity';

describe('TypeormUserMapper', () => {
  const mockModel: TypeormUserModel = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '123456789',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-02'),
  };

  const mockEntity: UserEntity = new UserEntity({
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '123456789',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-02'),
  });

  describe('toEntity', () => {
    it('should convert TypeormUserModel to UserEntity', () => {
      const entity = TypeormUserMapper.toEntity(mockModel);
      expect(entity).toBeInstanceOf(UserEntity);
      expect(entity).toEqual(mockEntity);
    });

    it('should return null if model is null', () => {
      const entity = TypeormUserMapper.toEntity(null);
      expect(entity).toBeNull();
    });
  });

  describe('toModel', () => {
    it('should convert UserEntity to TypeormUserModel', () => {
      const model = TypeormUserMapper.toModel(mockEntity);
      expect(model).toEqual(mockModel);
    });

    it('should return null if entity is null', () => {
      const model = TypeormUserMapper.toModel(null);
      expect(model).toBeNull();
    });
  });
});
