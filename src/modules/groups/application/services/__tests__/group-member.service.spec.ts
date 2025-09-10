import { GroupMemberService } from '../group-member.service';
import { IGroupMemberRepository } from '../../../domain/repositories/group-member.repository';
import { GroupMemberEntity } from '../../../domain/entities/group-member.entity';
import { GroupEntity } from '../../../../../modules/groups/domain/entities/group.entity';

describe('GroupMemberService', () => {
  let service: GroupMemberService;
  let repository: jest.Mocked<IGroupMemberRepository>;

  beforeEach(() => {
    repository = {
      findByGroupId: jest.fn(),
    } as unknown as jest.Mocked<IGroupMemberRepository>;

    service = new GroupMemberService(repository);
  });

  it('should return group members', async () => {
    const group = new GroupEntity({
      id: '1',
      name: 'Fake group',
      createdUserId: '1',
    });

    const members: GroupMemberEntity[] = [
      {
        id: '1',
        groupId: '123',
        userId: '10',
        isAdmin: true,
        group,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as GroupMemberEntity,
      {
        id: '2',
        groupId: '123',
        userId: '11',
        isAdmin: false,
        group,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as GroupMemberEntity,
    ];
    repository.findByGroupId.mockResolvedValue(members);

    const result = await service.findByGroupId('123');

    expect(repository.findByGroupId).toHaveBeenCalledWith('123');
    expect(result).toEqual(members);
  });

  it('should return an empty array if not find', async () => {
    repository.findByGroupId.mockResolvedValue([]);

    const result = await service.findByGroupId('999');

    expect(repository.findByGroupId).toHaveBeenCalledWith('999');
    expect(result).toEqual([]);
  });

  it('should return error', async () => {
    repository.findByGroupId.mockRejectedValue(new Error('DB error'));

    await expect(service.findByGroupId('123')).rejects.toThrow('DB error');
  });
});
