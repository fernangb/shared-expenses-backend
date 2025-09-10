import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseService } from '../expense.service';
import { UserNotExistsError } from '../../../../../modules/users/application/errors/user-not-exists.error';
import { GroupNotExistsError } from '../../../../../modules/groups/application/errors/group-not-exists.error';
import { InvalidGroupError } from '../../../../../modules/groups/application/errors/inavlid-group.error';
import { GroupMemberEntity } from '../../../../../modules/groups/domain/entities/group-member.entity';
import { ServiceEnum } from '../../../../../shared/enums/services';

describe('ExpenseService', () => {
  let service: ExpenseService;

  const mockUserService = { findById: jest.fn() };
  const mockGroupService = { findById: jest.fn() };
  const mockGroupMemberService = { findByGroupId: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseService,
        { provide: ServiceEnum.USER, useValue: mockUserService },
        { provide: ServiceEnum.GROUP, useValue: mockGroupService },
        { provide: ServiceEnum.GROUP_MEMBER, useValue: mockGroupMemberService },
      ],
    }).compile();

    service = module.get<ExpenseService>(ExpenseService);
  });

  describe('validate', () => {
    it('should throw UserNotExistsError if user not found', async () => {
      mockUserService.findById.mockResolvedValue(null);

      await expect(service.validate('user-1', 'group-1')).rejects.toThrow(
        UserNotExistsError,
      );
    });

    it('should throw GroupNotExistsError if group not found', async () => {
      mockUserService.findById.mockResolvedValue({ id: 'user-1' });
      mockGroupService.findById.mockResolvedValue(null);

      await expect(service.validate('user-1', 'group-1')).rejects.toThrow(
        GroupNotExistsError,
      );
    });

    it('should throw InvalidGroupError if user is not in group members', async () => {
      mockUserService.findById.mockResolvedValue({ id: 'user-1' });
      mockGroupService.findById.mockResolvedValue({ id: 'group-1' });
      mockGroupMemberService.findByGroupId.mockResolvedValue([
        { userId: 'other-user', group: { id: 'group-1' } },
      ] as GroupMemberEntity[]);

      await expect(service.validate('user-1', 'group-1')).rejects.toThrow(
        InvalidGroupError,
      );
    });

    it('should pass if user and group exist and user is member', async () => {
      const groupMembers = [
        { userId: 'user-1', group: { id: 'group-1' } },
      ] as GroupMemberEntity[];

      mockUserService.findById.mockResolvedValue({ id: 'user-1' });
      mockGroupService.findById.mockResolvedValue({ id: 'group-1' });
      mockGroupMemberService.findByGroupId.mockResolvedValue(groupMembers);

      await expect(
        service.validate('user-1', 'group-1'),
      ).resolves.toBeUndefined();
    });
  });

  describe('getGroupMembers', () => {
    it('should return group members if validation passes', async () => {
      const groupMembers = [
        { userId: 'user-1', group: { id: 'group-1' } },
      ] as GroupMemberEntity[];

      mockUserService.findById.mockResolvedValue({ id: 'user-1' });
      mockGroupService.findById.mockResolvedValue({ id: 'group-1' });
      mockGroupMemberService.findByGroupId.mockResolvedValue(groupMembers);

      const result = await service.getGroupMembers('user-1', 'group-1');

      expect(result).toEqual(groupMembers);
    });
  });
});
