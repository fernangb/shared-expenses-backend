import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { FindUserGroupsController } from '../find-user-groups.controller';
import { FindUserGroupsUseCase } from '../../../../application/use-cases/find-user-groups.use-case';
import { v4 as uuid } from 'uuid';

describe('FindUserGroupsController (integration)', () => {
  let app: INestApplication;
  let useCase: FindUserGroupsUseCase;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindUserGroupsController],
      providers: [
        {
          provide: FindUserGroupsUseCase,
          useValue: { handle: jest.fn(async () => ({ groups: [] })) },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    useCase = module.get<FindUserGroupsUseCase>(FindUserGroupsUseCase);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/groups/:userId (GET) - should return 200 with groups', async () => {
    const userId = uuid();

    const response = await request(app.getHttpServer())
      .get(`/groups/${userId}`)
      .expect(200);

    expect(response.body).toEqual({ groups: [] });
    expect(useCase.handle).toHaveBeenCalledWith({ userId });
  });

  it('/groups/:userId (GET) - should propagate errors', async () => {
    const userId = uuid();
    (useCase.handle as jest.Mock).mockRejectedValueOnce(
      new Error('Something went wrong'),
    );

    await request(app.getHttpServer()).get(`/groups/${userId}`).expect(500);
  });
});
