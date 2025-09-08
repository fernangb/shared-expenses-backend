import { UserAuthService } from '../user-auth.service';
import { IUserRepository } from '../../../../../modules/users/domain/repositories/user.repository';
import { UserEntity } from '../../../../../modules/users/domain/entities/user.entity';

describe('UserAuthService', () => {
  let service: UserAuthService;
  let repository: jest.Mocked<IUserRepository>;

  const mockUser: UserEntity = new UserEntity({
    id: '123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '123456789',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findByPhone: jest.fn(),
    };

    service = new UserAuthService(repository as unknown as IUserRepository);
  });

  describe('create', () => {
    it('should call repository.create with user entity', async () => {
      await service.create(mockUser);

      expect(repository.create).toHaveBeenCalledWith(mockUser);
    });

    it('should propagate errors from repository.create', async () => {
      repository.create.mockRejectedValueOnce(new Error('DB error'));

      await expect(service.create(mockUser)).rejects.toThrow('DB error');
    });
  });

  describe('findById', () => {
    it('should return a user from repository.findById', async () => {
      repository.findById.mockResolvedValueOnce(mockUser);

      const result = await service.findById('123');

      expect(repository.findById).toHaveBeenCalledWith('123');
      expect(result).toEqual(mockUser);
    });
  });

  describe('findByEmail', () => {
    it('should return a user from repository.findByEmail', async () => {
      repository.findByEmail.mockResolvedValueOnce(mockUser);

      const result = await service.findByEmail('john@example.com');

      expect(repository.findByEmail).toHaveBeenCalledWith('john@example.com');
      expect(result).toEqual(mockUser);
    });
  });

  describe('findByPhone', () => {
    it('should return a user from repository.findByPhone', async () => {
      repository.findByPhone.mockResolvedValueOnce(mockUser);

      const result = await service.findByPhone('123456789');

      expect(repository.findByPhone).toHaveBeenCalledWith('123456789');
      expect(result).toEqual(mockUser);
    });
  });
});
