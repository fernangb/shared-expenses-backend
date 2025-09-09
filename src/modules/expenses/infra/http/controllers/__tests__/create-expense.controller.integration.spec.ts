import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateExpenseController } from '../create-expense.controller';
import { CreateExpenseUseCase } from '../../../../application/use-cases/create-expense.use-case';

describe('CreateExpenseController (integration)', () => {
  let app: INestApplication;
  let useCase: CreateExpenseUseCase;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CreateExpenseController],
      providers: [
        {
          provide: CreateExpenseUseCase,
          useValue: { handle: jest.fn() },
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    useCase = moduleRef.get<CreateExpenseUseCase>(CreateExpenseUseCase);
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /expenses - should call useCase and return 201', async () => {
    const dto = {
      userId: 'user-1',
      groupId: 'group-1',
      name: 'Test Expense',
      description: 'Test description',
      value: 100,
      dueDate: new Date().toISOString(),
      paymentDate: new Date().toISOString(),
    };

    await request(app.getHttpServer()).post('/expenses').send(dto).expect(201);

    expect(useCase.handle).toHaveBeenCalledTimes(1);
    expect(useCase.handle).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: 'user-1',
        groupId: 'group-1',
        name: 'Test Expense',
        description: 'Test description',
        value: 100,
      }),
    );
  });
});
