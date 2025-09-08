import { Test, TestingModule } from '@nestjs/testing';
import { FindUserGroupsUseCase } from '../find-user-groups.use-case';
import { IUserService } from '../../../../users/domain/services/user.service';
import { IGroupRepository } from '../../../domain/repositories/group.repository';
import { UserNotExistsError } from '../../../../users/application/errors/user-not-exists.error';

describe('FindUserGroupsUseCase', () => {
  let useCase: FindUserGroupsUseCase;
  let userService: IUserService;
  let groupRepository: IGroupRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserGroupsUseCase,
        { provide: 'IUserService', useValue: { findById: jest.fn() } },
        { provide: 'IGroupRepository', useValue: { findByUserId: jest.fn() } },
      ],
    }).compile();

    useCase = module.get<FindUserGroupsUseCase>(FindUserGroupsUseCase);
    userService = module.get<IUserService>('IUserService');
    groupRepository = module.get<IGroupRepository>('IGroupRepository');
  });

  const input = { userId: 'user-id' };

  it('should throw UserNotExistsError if user does not exist', async () => {
    (userService.findById as jest.Mock).mockResolvedValue(null);

    await expect(useCase.handle(input)).rejects.toThrow(UserNotExistsError);
  });

  it('should return groups if user exists', async () => {
    const groups = [
      { id: 'group-1', name: 'Group 1' },
      { id: 'group-2', name: 'Group 2' },
    ];

    (userService.findById as jest.Mock).mockResolvedValue({ id: 'user-id' });
    (groupRepository.findByUserId as jest.Mock).mockResolvedValue(groups);

    const result = await useCase.handle(input);

    expect(result.groups).toEqual(groups);
  });
});
