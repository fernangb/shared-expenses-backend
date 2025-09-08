import { TypeormUserAuthMapper } from '../typeorm-user-auth.mapper';
import { UserAuthEntity } from '../../../../../../../modules/auth/domain/entities/user-auth.entity';
import { TypeormUserAuthModel } from '../../models/typeorm-user-auth.model';

describe('TypeormUserAuthMapper', () => {
  const mockUser = {
    id: 'user-123',
    firstName: 'John',
    lastName: 'Doe',
  } as any;

  const mockModel: TypeormUserAuthModel = {
    id: 'auth-123',
    user: mockUser,
    userId: 'user-123',
    password: 'hashed-password',
    createdAt: new Date('2025-01-01T00:00:00Z'),
    updatedAt: new Date('2025-01-02T00:00:00Z'),
  };

  const mockEntity = new UserAuthEntity({
    id: 'auth-123',
    user: mockUser,
    password: 'hashed-password',
    createdAt: new Date('2025-01-01T00:00:00Z'),
    updatedAt: new Date('2025-01-02T00:00:00Z'),
  });

  describe('toEntity', () => {
    it('should map a model to an entity', () => {
      const entity = TypeormUserAuthMapper.toEntity(mockModel);

      expect(entity).toBeInstanceOf(UserAuthEntity);
      expect(entity).toEqual(
        expect.objectContaining({
          id: mockModel.id,
          user: mockModel.user,
          password: mockModel.password,
          createdAt: mockModel.createdAt,
          updatedAt: mockModel.updatedAt,
        }),
      );
    });

    it('should return null when model is null', () => {
      const entity = TypeormUserAuthMapper.toEntity(null);
      expect(entity).toBeNull();
    });
  });

  describe('toModel', () => {
    it('should map an entity to a model', () => {
      const model = TypeormUserAuthMapper.toModel(mockEntity);

      expect(model).toEqual(
        expect.objectContaining({
          id: mockEntity.id,
          user: mockEntity.user,
          userId: mockEntity.user.id,
          password: mockEntity.password,
          createdAt: mockEntity.createdAt,
          updatedAt: mockEntity.updatedAt,
        }),
      );
    });

    it('should return null when entity is null', () => {
      const model = TypeormUserAuthMapper.toModel(null);
      expect(model).toBeNull();
    });
  });
});
