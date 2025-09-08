import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { RepositoryEnum } from '../../../../../shared/enums/repositories';
import { UserEntity } from '../../../../../modules/users/domain/entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  let repository: IUserRepository;

  const mockUser: UserEntity = new UserEntity({
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '123456789',
  });

  const repositoryMock = {
    create: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    findByPhone: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: RepositoryEnum.USER, useValue: repositoryMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<IUserRepository>(RepositoryEnum.USER);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call repository.create with the user', async () => {
      await service.create(mockUser);
      expect(repository.create).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      repository.findById = jest.fn().mockResolvedValue(mockUser);
      const user = await service.findById('1');
      expect(user).toEqual(mockUser);
      expect(repository.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      repository.findByEmail = jest.fn().mockResolvedValue(mockUser);
      const user = await service.findByEmail('john@example.com');
      expect(user).toEqual(mockUser);
      expect(repository.findByEmail).toHaveBeenCalledWith('john@example.com');
    });
  });

  describe('findByPhone', () => {
    it('should return a user by phone', async () => {
      repository.findByPhone = jest.fn().mockResolvedValue(mockUser);
      const user = await service.findByPhone('123456789');
      expect(user).toEqual(mockUser);
      expect(repository.findByPhone).toHaveBeenCalledWith('123456789');
    });
  });
});
