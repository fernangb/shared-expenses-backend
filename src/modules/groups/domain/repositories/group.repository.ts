import { GroupEntity } from '../entities/group.entity';

export interface IGroupRepository {
  create(entity: GroupEntity): Promise<void>;
  findById(id: string): Promise<GroupEntity>;
}
