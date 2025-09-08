import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { RegisterController } from '../register.controller';
import { RegisterUseCase } from '../../../../application/use-cases/register.use-case';
import { UserAlreadyExistsError } from '../../../../../../modules/users/application/errors/user-already-exists.error';

describe('RegisterController (integration)', () => {
  let app: INestApplication;
  let useCase: RegisterUseCase;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers: [
        {
          provide: RegisterUseCase,
          useValue: { handle: jest.fn() },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    useCase = module.get<RegisterUseCase>(RegisterUseCase);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/register (POST) should return success on valid input', async () => {
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

    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send(dto)
      .expect(201);

    expect(res.body).toEqual(result);
  });

  it('/auth/register (POST) should return 400 if user already exists', async () => {
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

    await request(app.getHttpServer())
      .post('/auth/register')
      .send(dto)
      .expect(400);
  });
});
