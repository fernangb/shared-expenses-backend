import { Repository } from 'typeorm';
import { TypeormUserAuthRepository } from '../typeorm-user-auth.repository';
import { TypeormUserAuthModel } from '../../models/typeorm-user-auth.model';
import { UserAuthEntity } from '../../../../../../../modules/auth/domain/entities/user-auth.entity';
import { TypeormUserAuthMapper } from '../../mappers/typeorm-user-auth.mapper';
import { UserEntity } from '../../../../../../../modules/users/domain/entities/user.entity';

jest.mock('../../mappers/typeorm-user-auth.mapper');

describe('TypeormUserAuthRepository', () => {
  let repository: TypeormUserAuthRepository;
  let mockRepository: jest.Mocked<Repository<TypeormUserAuthModel>>;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    } as unknown as jest.Mocked<Repository<TypeormUserAuthModel>>;

    repository = new TypeormUserAuthRepository(mockRepository);
  });

  describe('create', () => {
    it('should call repository.create and repository.save', async () => {
      const user = new UserEntity({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@email.com',
        phone: '21999999999',
      });

      const entity = new UserAuthEntity({
        id: 'uuid',
        user,
        password: 'hashed',
      });
      const model = {
        id: 'uuid',
        email: 'test@example.com',
        password: 'hashed',
      } as unknown as TypeormUserAuthModel;

      (TypeormUserAuthMapper.toModel as jest.Mock).mockReturnValue(model);
      mockRepository.create.mockReturnValue(model);

      await repository.create(entity);

      expect(TypeormUserAuthMapper.toModel).toHaveBeenCalledWith(entity);
      expect(mockRepository.create).toHaveBeenCalledWith(model);
      expect(mockRepository.save).toHaveBeenCalledWith(model);
    });
  });

  describe('findByEmail', () => {
    it('should return UserAuthEntity when model exists', async () => {
      const email = 'test@example.com';
      const model = {
        id: 'uuid',
        email,
        password: 'hashed',
      } as unknown as TypeormUserAuthModel;

      const user = new UserEntity({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@email.com',
        phone: '21999999999',
      });

      const entity = new UserAuthEntity({
        id: 'uuid',
        user,
        password: 'hashed',
      });
      mockRepository.findOne.mockResolvedValue(model);
      (TypeormUserAuthMapper.toEntity as jest.Mock).mockReturnValue(entity);

      const result = await repository.findByEmail(email);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { user: { email } },
      });
      expect(TypeormUserAuthMapper.toEntity).toHaveBeenCalledWith(model);
      expect(result).toBe(entity);
    });

    it('should return null when model does not exist', async () => {
      const email = 'test@example.com';

      mockRepository.findOne.mockResolvedValue(null);
      (TypeormUserAuthMapper.toEntity as jest.Mock).mockReturnValue(null);

      const result = await repository.findByEmail(email);

      expect(result).toBeNull();
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { user: { email } },
      });
    });
  });
});
