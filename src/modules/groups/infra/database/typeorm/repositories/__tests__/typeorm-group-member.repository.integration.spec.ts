/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeormGroupMemberRepository } from '../typeorm-group-member.repository';
import { TypeormGroupMemberModel } from '../../models/typeorm-group-member.model';
import { GroupMemberEntity } from '../../../../../../../modules/groups/domain/entities/group-member.entity';
import { TypeormGroupModel } from '../../models/typeorm-group.model';
import { v4 as uuid } from 'uuid';

describe('TypeormGroupMemberRepository Integration', () => {
  let module: TestingModule;
  let repository: TypeormGroupMemberRepository;
  let typeormRepo: Repository<TypeormGroupMemberModel>;
  let groupRepo: Repository<TypeormGroupModel>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [TypeormGroupMemberModel, TypeormGroupModel],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([TypeormGroupMemberModel, TypeormGroupModel]),
      ],
      providers: [TypeormGroupMemberRepository],
    }).compile();

    repository = module.get<TypeormGroupMemberRepository>(
      TypeormGroupMemberRepository,
    );
    typeormRepo = module.get<Repository<TypeormGroupMemberModel>>(
      getRepositoryToken(TypeormGroupMemberModel),
    );
    groupRepo = module.get<Repository<TypeormGroupModel>>(
      getRepositoryToken(TypeormGroupModel),
    );
  });

  afterAll(async () => {
    await module.close();
  });

  it('should create a group member and find by id', async () => {
    const group = groupRepo.create({
      id: uuid(),
      name: 'Test Group',
      createdUserId: uuid(),
    });
    await groupRepo.save(group);

    const member = new GroupMemberEntity({
      group,
      userId: uuid(),
      isAdmin: true,
    });

    await repository.create(member);

    const found = await repository.findById(member.userId, group.id);
    expect(found).not.toBeNull();
    expect(found.userId).toBe(member.userId);
    expect(found.group.id).toBe(group.id);
    expect(found.isAdmin).toBe(true);
  });

  it('should return all members of a group', async () => {
    const group = groupRepo.create({
      id: uuid(),
      name: 'Another Group',
      createdUserId: uuid(),
    });
    await groupRepo.save(group);

    const member1 = new GroupMemberEntity({
      group,
      userId: uuid(),
      isAdmin: false,
    });
    const member2 = new GroupMemberEntity({
      group,
      userId: uuid(),
      isAdmin: true,
    });

    await repository.create(member1);
    await repository.create(member2);

    const members = await repository.findByGroupId(group.id);
    expect(members.length).toBe(2);
    const userIds = members.map((m) => m.userId);
    expect(userIds).toContain(member1.userId);
    expect(userIds).toContain(member2.userId);
  });
});
