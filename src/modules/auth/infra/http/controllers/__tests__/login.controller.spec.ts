import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from '../login.controller';
import { LoginUseCase } from '../../../../../../modules/auth/application/use-cases/login.use-case';
import { InvalidCredentialsError } from '../../../../../../modules/auth/application/errors/invalid-credentials.error';

describe('LoginController (unit)', () => {
  let controller: LoginController;
  let loginUseCase: LoginUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: LoginUseCase,
          useValue: {
            handle: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LoginController>(LoginController);
    loginUseCase = module.get<LoginUseCase>(LoginUseCase);
  });

  it('should call loginUseCase.handle with correct DTO and return result', async () => {
    const dto = { email: 'test@example.com', password: '123456' };
    const result = {
      token: 'token123',
      user: { id: '1', email: 'test@example.com' },
    };
    (loginUseCase.handle as jest.Mock).mockResolvedValue(result);

    const response = await controller.login(dto);

    expect(loginUseCase.handle).toHaveBeenCalledWith(dto);
    expect(response).toEqual(result);
  });

  it('should throw InvalidCredentialsError when use-case throws', async () => {
    const dto = { email: 'wrong@example.com', password: '123' };
    (loginUseCase.handle as jest.Mock).mockRejectedValue(
      new InvalidCredentialsError(),
    );

    await expect(controller.login(dto)).rejects.toThrow(
      InvalidCredentialsError,
    );
  });
});
