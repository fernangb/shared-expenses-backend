import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { FindGroupExpenseController } from '../find-group-expense.controller';
import { FindGroupExpenseUseCase } from '../../../../../../modules/expenses/application/use-cases/find-group-expense.use-case';

describe('FindGroupExpenseController (integration)', () => {
  let app: INestApplication;
  let useCase: FindGroupExpenseUseCase;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindGroupExpenseController],
      providers: [
        {
          provide: FindGroupExpenseUseCase,
          useValue: { handle: jest.fn() },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    useCase = module.get<FindGroupExpenseUseCase>(FindGroupExpenseUseCase);
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /expenses/:userId?groupId=group-1 should return expenses', async () => {
    const userId = 'user-1';
    const groupId = 'group-1';
    const mockResult = [{ id: 'expense-1', value: 100 }];

    (useCase.handle as jest.Mock).mockResolvedValue(mockResult);

    const response = await request(app.getHttpServer())
      .get(`/expenses/${userId}?groupId=${groupId}`)
      .expect(200);

    expect(response.body).toEqual(mockResult);
    expect(useCase.handle).toHaveBeenCalledWith({ userId, groupId });
  });

  it('should return 500 if useCase throws', async () => {
    const userId = 'user-1';
    const groupId = 'group-1';

    (useCase.handle as jest.Mock).mockRejectedValue(new Error('Invalid input'));

    const response = await request(app.getHttpServer())
      .get(`/expenses/${userId}?groupId=${groupId}`)
      .expect(500);

    expect(response.body).toHaveProperty('message', 'Internal server error');
  });
});
