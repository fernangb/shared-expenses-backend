import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeormGroupRepository } from '../typeorm-group.repository';
import { TypeormGroupModel } from '../../models/typeorm-group.model';
import { TypeormGroupMemberModel } from '../../models/typeorm-group-member.model';
import { GroupEntity } from '../../../../../domain/entities/group.entity';
import { v4 as uuid } from 'uuid';

describe('TypeormGroupRepository Integration', () => {
  let module: TestingModule;
  let repository: TypeormGroupRepository;
  let typeormRepo: Repository<TypeormGroupModel>;
  let groupMemberRepo: Repository<TypeormGroupMemberModel>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
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
      providers: [TypeormGroupRepository],
    }).compile();

    repository = module.get<TypeormGroupRepository>(TypeormGroupRepository);
    typeormRepo = module.get<Repository<TypeormGroupModel>>(
      getRepositoryToken(TypeormGroupModel),
    );
    groupMemberRepo = module.get<Repository<TypeormGroupMemberModel>>(
      getRepositoryToken(TypeormGroupMemberModel),
    );
  });

  afterAll(async () => {
    await module.close();
  });

  it('should create a group and find it by id', async () => {
    const groupEntity = new GroupEntity({
      id: uuid(),
      name: 'Test Group',
      createdUserId: uuid(),
    });
    await repository.create(groupEntity);

    const found = await repository.findById(groupEntity.id);
    expect(found).not.toBeNull();
    expect(found.id).toBe(groupEntity.id);
    expect(found.name).toBe('Test Group');
  });

  it('should return groups by user id', async () => {
    const userId = uuid();

    const group1 = typeormRepo.create({
      id: uuid(),
      name: 'Group 1',
      createdUserId: userId,
    });
    const group2 = typeormRepo.create({
      id: uuid(),
      name: 'Group 2',
      createdUserId: userId,
    });

    await typeormRepo.save([group1, group2]);

    await groupMemberRepo.save([
      groupMemberRepo.create({
        id: uuid(),
        group: group1,
        groupId: group1.id,
        userId,
        isAdmin: true,
      }),
      groupMemberRepo.create({
        id: uuid(),
        group: group2,
        groupId: group2.id,
        userId,
        isAdmin: false,
      }),
    ]);

    const groups = await repository.findByUserId(userId);
    expect(groups.length).toBe(2);
    const groupNames = groups.map((g) => g.name);
    expect(groupNames).toContain('Group 1');
    expect(groupNames).toContain('Group 2');
  });
});
