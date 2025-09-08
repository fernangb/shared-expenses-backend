import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { LoginController } from '../login.controller';
import { LoginUseCase } from '../../../../../../modules/auth/application/use-cases/login.use-case';
import { InvalidCredentialsError } from '../../../../../../modules/auth/application/errors/invalid-credentials.error';

describe('LoginController (integration)', () => {
  let app: INestApplication;
  let loginUseCase: LoginUseCase;

  beforeAll(async () => {
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

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    loginUseCase = module.get<LoginUseCase>(LoginUseCase);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/login (POST) should return token and user on success', async () => {
    const dto = { email: 'test@example.com', password: '123456' };
    const result = {
      token: 'token123',
      user: { id: '1', email: 'test@example.com' },
    };
    (loginUseCase.handle as jest.Mock).mockResolvedValue(result);

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(dto)
      .expect(201);

    expect(res.body).toEqual(result);
  });

  it('/auth/login (POST) should return 400 if credentials invalid', async () => {
    const dto = { email: 'wrong@example.com', password: '123' };
    (loginUseCase.handle as jest.Mock).mockRejectedValue(
      new InvalidCredentialsError(),
    );

    await request(app.getHttpServer())
      .post('/auth/login')
      .send(dto)
      .expect(400);
  });
});
