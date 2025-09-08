import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { FindGroupMembersController } from '../find-group-members.controller';
import { FindGroupMembersUseCase } from '../../../../application/use-cases/find-group-members.use-case';
import { v4 as uuid } from 'uuid';

describe('FindGroupMembersController (Integration)', () => {
  let app: INestApplication;
  let useCase: FindGroupMembersUseCase;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindGroupMembersController],
      providers: [
        {
          provide: FindGroupMembersUseCase,
          useValue: { handle: jest.fn(async () => ({ groupMembers: [] })) },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    useCase = module.get<FindGroupMembersUseCase>(FindGroupMembersUseCase);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/groups/:groupId/members/:userId (GET) - should return 200 with members', async () => {
    const groupId = uuid();
    const userId = uuid();

    const response = await request(app.getHttpServer())
      .get(`/groups/${groupId}/members/${userId}`)
      .expect(200);

    expect(response.body).toEqual({ groupMembers: [] });
    expect(useCase.handle).toHaveBeenCalledWith({ groupId, userId });
  });

  it('/groups/:groupId/members/:userId (GET) - should propagate errors', async () => {
    const groupId = uuid();
    const userId = uuid();
    (useCase.handle as jest.Mock).mockRejectedValueOnce(
      new Error('Something went wrong'),
    );

    await request(app.getHttpServer())
      .get(`/groups/${groupId}/members/${userId}`)
      .expect(500);
  });
});
