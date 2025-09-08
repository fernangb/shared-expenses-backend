import { Test, TestingModule } from '@nestjs/testing';
import { FindGroupMembersUseCase } from '../find-group-members.use-case';
import { IUserService } from '../../../../users/domain/services/user.service';
import { IGroupRepository } from '../../../domain/repositories/group.repository';
import { IGroupMemberRepository } from '../../../domain/repositories/group-member.repository';
import { UserNotExistsError } from '../../../../users/application/errors/user-not-exists.error';
import { GroupNotExistsError } from '../../errors/group-not-exists.error';
import { InvalidGroupMemberError } from '../../errors/invalid-group-member.error';

describe('FindGroupMembersUseCase', () => {
  let useCase: FindGroupMembersUseCase;
  let userService: IUserService;
  let groupRepository: IGroupRepository;
  let groupMemberRepository: IGroupMemberRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindGroupMembersUseCase,
        { provide: 'IUserService', useValue: { findById: jest.fn() } },
        { provide: 'IGroupRepository', useValue: { findById: jest.fn() } },
        {
          provide: 'IGroupMemberRepository',
          useValue: { findByGroupId: jest.fn() },
        },
      ],
    }).compile();

    useCase = module.get<FindGroupMembersUseCase>(FindGroupMembersUseCase);
    userService = module.get<IUserService>('IUserService');
    groupRepository = module.get<IGroupRepository>('IGroupRepository');
    groupMemberRepository = module.get<IGroupMemberRepository>(
      'IGroupMemberRepository',
    );
  });

  const input = { userId: 'user-id', groupId: 'group-id' };

  it('should throw UserNotExistsError if user does not exist', async () => {
    (userService.findById as jest.Mock).mockResolvedValue(null);

    await expect(useCase.handle(input)).rejects.toThrow(UserNotExistsError);
  });

  it('should throw GroupNotExistsError if group does not exist', async () => {
    (userService.findById as jest.Mock).mockResolvedValue({ id: 'user-id' });
    (groupRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(useCase.handle(input)).rejects.toThrow(GroupNotExistsError);
  });

  it('should throw InvalidGroupMemberError if user is not a member', async () => {
    (userService.findById as jest.Mock).mockResolvedValue({ id: 'user-id' });
    (groupRepository.findById as jest.Mock).mockResolvedValue({
      id: 'group-id',
    });
    (groupMemberRepository.findByGroupId as jest.Mock).mockResolvedValue([
      { userId: 'other-user' },
    ]);

    await expect(useCase.handle(input)).rejects.toThrow(
      InvalidGroupMemberError,
    );
  });

  it('should return group members if user is a member', async () => {
    const members = [{ userId: 'user-id' }, { userId: 'other-user' }];

    (userService.findById as jest.Mock).mockResolvedValue({ id: 'user-id' });
    (groupRepository.findById as jest.Mock).mockResolvedValue({
      id: 'group-id',
    });
    (groupMemberRepository.findByGroupId as jest.Mock).mockResolvedValue(
      members,
    );

    const result = await useCase.handle(input);

    expect(result.groupMembers).toEqual(members);
  });
});
