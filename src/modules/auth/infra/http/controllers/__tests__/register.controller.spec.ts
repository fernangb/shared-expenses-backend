import { Test, TestingModule } from '@nestjs/testing';
import { RegisterController } from '../register.controller';
import { RegisterUseCase } from '../../../../application/use-cases/register.use-case';
import { UserAlreadyExistsError } from '../../../../../../modules/users/application/errors/user-already-exists.error';

describe('RegisterController (unit)', () => {
  let controller: RegisterController;
  let useCase: RegisterUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers: [
        {
          provide: RegisterUseCase,
          useValue: { handle: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<RegisterController>(RegisterController);
    useCase = module.get<RegisterUseCase>(RegisterUseCase);
  });

  it('should call useCase.handle with correct DTO and return result', async () => {
    const dto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      password: '123456',
      confirmPassword: '123456',
    };

    const result = { success: true };
    (useCase.handle as jest.Mock).mockResolvedValue(result);

    const response = await controller.login(dto);

    expect(useCase.handle).toHaveBeenCalledWith(dto);
    expect(response).toEqual(result);
  });

  it('should throw UserAlreadyExistsError when use-case throws', async () => {
    const dto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      password: '123456',
      confirmPassword: '123456',
    };

    (useCase.handle as jest.Mock).mockRejectedValue(
      new UserAlreadyExistsError(),
    );

    await expect(controller.login(dto)).rejects.toThrow(UserAlreadyExistsError);
  });
});
