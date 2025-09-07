import { GroupMemberEntity } from '../entities/group-member.entity';

export interface IGroupMemberRepository {
  create(entity: GroupMemberEntity): Promise<void>;
  findById(id: string, groupId: string): Promise<GroupMemberEntity>;
  findByGroupId(groupId: string): Promise<GroupMemberEntity[]>;
}
