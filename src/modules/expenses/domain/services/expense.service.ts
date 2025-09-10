import { GroupMemberEntity } from '../../../../modules/groups/domain/entities/group-member.entity';

export interface IExpenseService {
  validate(userId: string, groupId: string): Promise<void>;
  getGroupMembers(
    userId: string,
    groupId: string,
  ): Promise<GroupMemberEntity[]>;
}
