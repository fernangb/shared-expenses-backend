import { Test, TestingModule } from '@nestjs/testing';
import { AddGroupMemberUseCase } from '../add-group-member.use-case';
import { IUserService } from '../../../../../modules/users/domain/services/user.service';
import { IGroupRepository } from '../../../../../modules/groups/domain/repositories/group.repository';
import { IGroupMemberRepository } from '../../../../../modules/groups/domain/repositories/group-member.repository';
import { AddGroupMemberInputDTO } from '../../../../../modules/groups/infra/http/dtos/add-group-member.dto';
import { GroupNotExistsError } from '../../errors/group-not-exists.error';
import { InvalidGroupError } from '../../errors/inavlid-group.error';
import { OnlyAdminCanAddUserError } from '../../errors/only-admin-can-add-user.error';
import { GroupMemberNotExistsError } from '../../errors/group-member-not-exists.error';
import { AddYourselfError } from '../../errors/add-yourself-error';
import { AlreadyAddedError } from '../../errors/already-added.error';

describe('AddGroupMemberUseCase', () => {
  let useCase: AddGroupMemberUseCase;
  let userService: IUserService;
  let groupRepository: IGroupRepository;
  let groupMemberRepository: IGroupMemberRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddGroupMemberUseCase,
        { provide: 'IUserService', useValue: { findByEmail: jest.fn() } },
        { provide: 'IGroupRepository', useValue: { findById: jest.fn() } },
        {
          provide: 'IGroupMemberRepository',
          useValue: { findById: jest.fn(), create: jest.fn() },
        },
      ],
    }).compile();

    useCase = module.get<AddGroupMemberUseCase>(AddGroupMemberUseCase);
    userService = module.get<IUserService>('IUserService');
    groupRepository = module.get<IGroupRepository>('IGroupRepository');
    groupMemberRepository = module.get<IGroupMemberRepository>(
      'IGroupMemberRepository',
    );
  });

  const dto: AddGroupMemberInputDTO = {
    groupId: 'group-id',
    adminId: 'admin-id',
    memberEmail: 'member@example.com',
  };

  it('should throw GroupNotExistsError if group does not exist', async () => {
    (groupRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(useCase.handle(dto)).rejects.toThrow(GroupNotExistsError);
  });

  it('should throw InvalidGroupError if admin is not in the group', async () => {
    (groupRepository.findById as jest.Mock).mockResolvedValue({
      id: 'group-id',
    });
    (groupMemberRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(useCase.handle(dto)).rejects.toThrow(InvalidGroupError);
  });

  it('should throw OnlyAdminCanAddUserError if admin is not admin', async () => {
    (groupRepository.findById as jest.Mock).mockResolvedValue({
      id: 'group-id',
    });
    (groupMemberRepository.findById as jest.Mock).mockResolvedValue({
      id: 'admin-id',
      isAdmin: false,
    });

    await expect(useCase.handle(dto)).rejects.toThrow(OnlyAdminCanAddUserError);
  });

  it('should throw GroupMemberNotExistsError if new member does not exist', async () => {
    (groupRepository.findById as jest.Mock).mockResolvedValue({
      id: 'group-id',
    });
    (groupMemberRepository.findById as jest.Mock).mockResolvedValue({
      id: 'admin-id',
      isAdmin: true,
    });
    (userService.findByEmail as jest.Mock).mockResolvedValue(null);

    await expect(useCase.handle(dto)).rejects.toThrow(
      GroupMemberNotExistsError,
    );
  });

  it('should throw AddYourselfError if admin tries to add themselves', async () => {
    (groupRepository.findById as jest.Mock).mockResolvedValue({
      id: 'group-id',
    });
    (groupMemberRepository.findById as jest.Mock).mockResolvedValue({
      id: 'admin-id',
      isAdmin: true,
    });
    (userService.findByEmail as jest.Mock).mockResolvedValue({
      id: 'admin-id',
    });

    await expect(useCase.handle(dto)).rejects.toThrow(AddYourselfError);
  });

  it('should throw AlreadyAddedError if member already added', async () => {
    (groupRepository.findById as jest.Mock).mockResolvedValue({
      id: 'group-id',
    });
    (groupMemberRepository.findById as jest.Mock)
      .mockResolvedValueOnce({ id: 'admin-id', isAdmin: true })
      .mockResolvedValueOnce({ id: 'member-id' });
    (userService.findByEmail as jest.Mock).mockResolvedValue({
      id: 'member-id',
    });

    await expect(useCase.handle(dto)).rejects.toThrow(AlreadyAddedError);
  });

  it('should create a group member if all validations pass', async () => {
    (groupRepository.findById as jest.Mock).mockResolvedValue({
      id: 'group-id',
    });
    (groupMemberRepository.findById as jest.Mock)
      .mockResolvedValueOnce({ id: 'admin-id', isAdmin: true })
      .mockResolvedValueOnce(null);
    (userService.findByEmail as jest.Mock).mockResolvedValue({
      id: 'member-id',
    });

    await useCase.handle(dto);

    expect(groupMemberRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({ userId: 'member-id', isAdmin: false }),
    );
  });
});
