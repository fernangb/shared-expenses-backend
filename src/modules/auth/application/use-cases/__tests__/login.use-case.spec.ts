import { LoginUseCase } from '../login.use-case';
import { IUserAuthRepository } from '../../../../../modules/auth/domain/repositories/user-auth.repository';
import IHashProvider from '../../../../../modules/auth/domain/providers/hash.provider';
import ITokenProvider from '../../../../../modules/auth/domain/providers/token.provider';
import { InvalidCredentialsError } from '../../errors/invalid-credentials.error';
import { UserAuthEntity } from '../../../../../modules/auth/domain/entities/user-auth.entity';
import { UserEntity } from '../../../../../modules/users/domain/entities/user.entity';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let userAuthRepository: jest.Mocked<IUserAuthRepository>;
  let hashProvider: jest.Mocked<IHashProvider>;
  let tokenProvider: jest.Mocked<ITokenProvider>;

  const mockUser = new UserEntity({
    id: 'user-123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '123456789',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const mockUserAuth = new UserAuthEntity({
    id: 'auth-123',
    user: mockUser,
    password: 'hashed-password',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  beforeEach(() => {
    userAuthRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    hashProvider = {
      createHash: jest.fn(),
      compareHash: jest.fn(),
    };

    tokenProvider = {
      createToken: jest.fn(),
      validateToken: jest.fn(),
    };

    useCase = new LoginUseCase(userAuthRepository, hashProvider, tokenProvider);
  });

  it('should login successfully with valid credentials', async () => {
    userAuthRepository.findByEmail.mockResolvedValueOnce(mockUserAuth);
    hashProvider.compareHash.mockResolvedValueOnce(true);
    tokenProvider.createToken.mockReturnValueOnce('valid-token');

    const result = await useCase.handle({
      email: 'john@example.com',
      password: 'plain-password',
    });

    expect(userAuthRepository.findByEmail).toHaveBeenCalledWith(
      'john@example.com',
    );
    expect(hashProvider.compareHash).toHaveBeenCalledWith(
      'plain-password',
      'hashed-password',
    );
    expect(tokenProvider.createToken).toHaveBeenCalledWith('auth-123');
    expect(result).toEqual({
      user: mockUser,
      token: 'valid-token',
    });
  });

  it('should throw InvalidCredentialsError if user not found', async () => {
    userAuthRepository.findByEmail.mockResolvedValueOnce(null);

    await expect(
      useCase.handle({ email: 'notfound@example.com', password: '123456' }),
    ).rejects.toThrow(InvalidCredentialsError);
  });

  it('should throw InvalidCredentialsError if password does not match', async () => {
    userAuthRepository.findByEmail.mockResolvedValueOnce(mockUserAuth);
    hashProvider.compareHash.mockResolvedValueOnce(false);

    await expect(
      useCase.handle({ email: 'john@example.com', password: 'wrong' }),
    ).rejects.toThrow(InvalidCredentialsError);
  });
});
