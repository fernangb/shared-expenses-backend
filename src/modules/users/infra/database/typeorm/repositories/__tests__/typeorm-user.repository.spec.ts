import { Repository } from 'typeorm';
import { TypeormUserModel } from '../../models/typeorm-user.model';
import { TypeormUserRepository } from '../typeorm-user.repository';
import { TypeormUserMapper } from '../../mappers/typeorm-user.mapper';
import { UserEntity } from '../../../../../../../modules/users/domain/entities/user.entity';

jest.mock('../../mappers/typeorm-user.mapper');

describe('TypeormUserRepository', () => {
  let repository: TypeormUserRepository;
  let ormRepository: jest.Mocked<Repository<TypeormUserModel>>;

  const userEntity = new UserEntity({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@email.com',
    phone: '21999999999',
  });

  const userModel: TypeormUserModel = {
    id: '123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@email.com',
    phone: '21999999999',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    ormRepository = {
      save: jest.fn(),
      create: jest.fn(),
      findOne: jest.fn(),
    } as any;

    repository = new TypeormUserRepository(ormRepository);

    (TypeormUserMapper.toModel as jest.Mock).mockReturnValue(userModel);
    (TypeormUserMapper.toEntity as jest.Mock).mockReturnValue(userEntity);
  });

  describe('create', () => {
    it('should map entity to model and save it', async () => {
      ormRepository.create.mockReturnValue(userModel);

      await repository.create(userEntity);

      expect(TypeormUserMapper.toModel).toHaveBeenCalledWith(userEntity);
      expect(ormRepository.create).toHaveBeenCalledWith(userModel);
      expect(ormRepository.save).toHaveBeenCalledWith(userModel);
    });
  });

  describe('findById', () => {
    it('should return entity when user is found', async () => {
      ormRepository.findOne.mockResolvedValue(userModel);

      const result = await repository.findById('123');

      expect(ormRepository.findOne).toHaveBeenCalledWith({
        where: { id: '123' },
      });
      expect(TypeormUserMapper.toEntity).toHaveBeenCalledWith(userModel);
      expect(result).toEqual(userEntity);
    });

    it('should return null when user is not found', async () => {
      ormRepository.findOne.mockResolvedValue(null);

      (TypeormUserMapper.toEntity as jest.Mock).mockReturnValue(null);

      const result = await repository.findById('not-found');

      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should return entity when user is found by email', async () => {
      ormRepository.findOne.mockResolvedValue(userModel);

      const result = await repository.findByEmail('test@email.com');

      expect(ormRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@email.com' },
      });
      expect(result).toEqual(userEntity);
    });
  });

  describe('findByPhone', () => {
    it('should return entity when user is found by phone', async () => {
      ormRepository.findOne.mockResolvedValue(userModel);

      const result = await repository.findByPhone('999999999');

      expect(ormRepository.findOne).toHaveBeenCalledWith({
        where: { phone: '999999999' },
      });
      expect(result).toEqual(userEntity);
    });
  });
});
