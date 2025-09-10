import { Inject, Injectable } from '@nestjs/common';
import { GroupMemberEntity } from '../../../../modules/groups/domain/entities/group-member.entity';
import { IExpenseService } from '../../domain/services/expense.service';
import { ServiceEnum } from '../../../../shared/enums/services';
import { IUserService } from '../../../../modules/users/domain/services/user.service';
import { IGroupService } from '../../../../modules/groups/domain/services/group.service';
import { IGroupMemberService } from '../../../../modules/groups/domain/services/group-member.service';
import { UserNotExistsError } from '../../../../modules/users/application/errors/user-not-exists.error';
import { GroupNotExistsError } from '../../../../modules/groups/application/errors/group-not-exists.error';
import { InvalidGroupError } from '../../../../modules/groups/application/errors/inavlid-group.error';

@Injectable()
export class ExpenseService implements IExpenseService {
  constructor(
    @Inject(ServiceEnum.USER)
    private readonly userService: IUserService,
    @Inject(ServiceEnum.GROUP)
    private readonly groupService: IGroupService,
    @Inject(ServiceEnum.GROUP_MEMBER)
    private readonly groupMemberService: IGroupMemberService,
  ) {}

  async validate(userId: string, groupId: string): Promise<void> {
    await this.validateUser(userId);
    await this.validateGroup(groupId);

    const groupMembers = await this.groupMemberService.findByGroupId(groupId);

    await this.validateGroupMembers(groupMembers, userId);
  }

  async getGroupMembers(
    userId: string,
    groupId: string,
  ): Promise<GroupMemberEntity[]> {
    await this.validateUser(userId);
    await this.validateGroup(groupId);

    const groupMembers = await this.groupMemberService.findByGroupId(groupId);

    await this.validateGroupMembers(groupMembers, userId);

    return groupMembers;
  }

  private async validateUser(userId: string): Promise<void> {
    const user = await this.userService.findById(userId);
    if (!user) throw new UserNotExistsError();
  }

  private async validateGroup(groupId: string): Promise<void> {
    const group = await this.groupService.findById(groupId);
    if (!group) throw new GroupNotExistsError();
  }

  private async validateGroupMembers(
    groupMembers: GroupMemberEntity[],
    userId: string,
  ): Promise<void> {
    const isMember = groupMembers.find((member) => member.userId === userId);

    if (!isMember) throw new InvalidGroupError();
  }
}
