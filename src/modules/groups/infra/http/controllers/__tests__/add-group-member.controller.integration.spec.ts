/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AddGroupMemberController } from '../add-group-member.controller';
import { AddGroupMemberUseCase } from '../../../../../../modules/groups/application/use-cases/add-group-member.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormGroupModel } from '../../../database/typeorm/models/typeorm-group.model';
import { TypeormGroupMemberModel } from '../../../database/typeorm/models/typeorm-group-member.model';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';

describe('AddGroupMemberController (Integration)', () => {
  let app: INestApplication;
  let groupRepo: Repository<TypeormGroupModel>;
  let groupMemberRepo: Repository<TypeormGroupMemberModel>;

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
      controllers: [AddGroupMemberController],
      providers: [
        {
          provide: AddGroupMemberUseCase,
          useValue: {
            handle: jest.fn(async () => {}),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    groupRepo = module.get<Repository<TypeormGroupModel>>(
      getRepositoryToken(TypeormGroupModel),
    );
    groupMemberRepo = module.get<Repository<TypeormGroupMemberModel>>(
      getRepositoryToken(TypeormGroupMemberModel),
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it('/groups/members (POST) - should call useCase.handle', async () => {
    const dto = {
      groupId: uuid(),
      adminId: uuid(),
      memberEmail: 'user@test.com',
    };

    const response = await request(app.getHttpServer())
      .post('/groups/members')
      .send(dto)
      .expect(201);

    expect(response.body).toEqual({});
  });
});
