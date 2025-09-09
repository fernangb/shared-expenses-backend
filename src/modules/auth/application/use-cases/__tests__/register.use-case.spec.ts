import { RegisterUseCase } from '../register.use-case';
import { IUserService } from '../../../../users/domain/services/user.service';
import { IUserAuthRepository } from '../../../domain/repositories/user-auth.repository';
import IHashProvider from '../../../domain/providers/hash.provider';
import { UserAlreadyExistsError } from '../../../../users/application/errors/user-already-exists.error';
import { PasswordNotMatchError } from '../../errors/password-not-match.error';
import { UserEntity } from '../../../../users/domain/entities/user.entity';
import { UserAuthEntity } from '../../../domain/entities/user-auth.entity';

describe('RegisterUseCase', () => {
  let useCase: RegisterUseCase;
  let userService: jest.Mocked<IUserService>;
  let userAuthRepository: jest.Mocked<IUserAuthRepository>;
  let hashProvider: jest.Mocked<IHashProvider>;

  const input = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '21999999999',
    password: '123456',
    confirmPassword: '123456',
  };

  beforeEach(() => {
    userService = {
      findByEmail: jest.fn(),
      findByPhone: jest.fn(),
      create: jest.fn(),
    } as any;

    userAuthRepository = {
      create: jest.fn(),
    } as any;

    hashProvider = {
      createHash: jest.fn(),
    } as any;

    useCase = new RegisterUseCase(
      userService,
      userAuthRepository,
      hashProvider,
    );
  });

  it('should register a user', async () => {
    userService.findByEmail.mockResolvedValue(null);
    userService.findByPhone.mockResolvedValue(null);
    hashProvider.createHash.mockResolvedValue('hashedPassword');

    await useCase.handle(input);

    expect(userService.findByEmail).toHaveBeenCalledWith(input.email);
    expect(userService.findByPhone).toHaveBeenCalledWith(input.phone);
    expect(hashProvider.createHash).toHaveBeenCalledWith(input.password);

    expect(userService.create).toHaveBeenCalledWith(expect.any(UserEntity));
    expect(userAuthRepository.create).toHaveBeenCalledWith(
      expect.any(UserAuthEntity),
    );
  });

  it('should return error if email already exists', async () => {
    userService.findByEmail.mockResolvedValue({} as UserEntity);

    await expect(useCase.handle(input)).rejects.toThrow(UserAlreadyExistsError);

    expect(userService.findByEmail).toHaveBeenCalledWith(input.email);
    expect(userService.findByPhone).not.toHaveBeenCalled();
  });

  it('should return error if phone already exists', async () => {
    userService.findByEmail.mockResolvedValue(null);
    userService.findByPhone.mockResolvedValue({} as UserEntity);

    await expect(useCase.handle(input)).rejects.toThrow(UserAlreadyExistsError);

    expect(userService.findByPhone).toHaveBeenCalledWith(input.phone);
  });

  it('should return error if passwords does not match', async () => {
    const invalidInput = { ...input, confirmPassword: 'different' };

    userService.findByEmail.mockResolvedValue(null);
    userService.findByPhone.mockResolvedValue(null);

    await expect(useCase.handle(invalidInput)).rejects.toThrow(
      PasswordNotMatchError,
    );

    expect(hashProvider.createHash).not.toHaveBeenCalled();
  });
});
