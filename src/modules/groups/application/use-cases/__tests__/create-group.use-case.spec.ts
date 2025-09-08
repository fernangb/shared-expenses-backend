import { Test, TestingModule } from '@nestjs/testing';
import { CreateGroupUseCase } from '../create-group.use-case';
import { IUserService } from '../../../../users/domain/services/user.service';
import { IGroupRepository } from '../../../domain/repositories/group.repository';
import { IGroupMemberRepository } from '../../../domain/repositories/group-member.repository';
import { UserNotExistsError } from '../../../../users/application/errors/user-not-exists.error';
import { CreateGroupInputDTO } from '../../../infra/http/dtos/create-group.dto';

describe('CreateGroupUseCase', () => {
  let useCase: CreateGroupUseCase;
  let userService: IUserService;
  let groupRepository: IGroupRepository;
  let groupMemberRepository: IGroupMemberRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateGroupUseCase,
        { provide: 'IUserService', useValue: { findById: jest.fn() } },
        { provide: 'IGroupRepository', useValue: { create: jest.fn() } },
        { provide: 'IGroupMemberRepository', useValue: { create: jest.fn() } },
      ],
    }).compile();

    useCase = module.get<CreateGroupUseCase>(CreateGroupUseCase);
    userService = module.get<IUserService>('IUserService');
    groupRepository = module.get<IGroupRepository>('IGroupRepository');
    groupMemberRepository = module.get<IGroupMemberRepository>(
      'IGroupMemberRepository',
    );
  });

  const dto: CreateGroupInputDTO = {
    userId: 'user-id',
    name: 'New Group',
  };

  it('should throw UserNotExistsError if user does not exist', async () => {
    (userService.findById as jest.Mock).mockResolvedValue(null);

    await expect(useCase.handle(dto)).rejects.toThrow(UserNotExistsError);
  });

  it('should create a group and group member if user exists', async () => {
    const mockUser = { id: 'user-id' };
    (userService.findById as jest.Mock).mockResolvedValue(mockUser);

    await useCase.handle(dto);

    expect(groupRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({ name: dto.name, createdUserId: dto.userId }),
    );

    expect(groupMemberRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({ userId: dto.userId, isAdmin: true }),
    );
  });
});
