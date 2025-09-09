import { GroupMemberEntity } from '../entities/group-member.entity';

export interface IGroupMemberService {
  findByGroupId(groupId: string): Promise<GroupMemberEntity[]>;
}
