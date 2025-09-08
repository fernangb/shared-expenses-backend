/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateGroupController } from '../create-group.controller';
import { CreateGroupUseCase } from '../../../../application/use-cases/create-group.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormGroupModel } from '../../../database/typeorm/models/typeorm-group.model';
import { TypeormGroupMemberModel } from '../../../database/typeorm/models/typeorm-group-member.model';
import { v4 as uuid } from 'uuid';

describe('CreateGroupController (Integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [TypeormGroupModel, TypeormGroupMemberModel],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([TypeormGroupModel, TypeormGroupMemberModel]),
      ],
      controllers: [CreateGroupController],
      providers: [
        {
          provide: CreateGroupUseCase,
          useValue: { handle: jest.fn(async () => {}) },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/groups (POST) - should call useCase.handle and return 201', async () => {
    const dto = { userId: uuid(), name: 'Test Group' };

    const response = await request(app.getHttpServer())
      .post('/groups')
      .send(dto)
      .expect(201);

    expect(response.body).toEqual({});
  });
});
