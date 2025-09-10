import { GroupEntity } from '../entities/group.entity';

export interface IGroupService {
  findById(id: string): Promise<GroupEntity>;
}
