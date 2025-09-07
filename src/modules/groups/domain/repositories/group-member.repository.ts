import { GroupMemberEntity } from '../entities/group-member.entity';

export interface IGroupMemberRepository {
  create(entity: GroupMemberEntity): Promise<void>;
}
