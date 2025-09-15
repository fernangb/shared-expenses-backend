import { GroupEntity } from '../../../../../../modules/groups/domain/entities/group.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TypeormGroupModel } from './typeorm-group.model';
import { TypeormBaseModel } from 'src/shared/modules/database/typeorm/typeorm-base.entity';
import { GroupMemberEntity } from 'src/modules/groups/domain/entities/group-member.entity';

@Entity({ name: 'group_members' })
export class TypeormGroupMemberModel extends TypeormBaseModel<GroupMemberEntity> {
  @Column({ name: 'group_id', type: 'uuid' })
  groupId: string;

  @ManyToOne(() => TypeormGroupModel, (model) => model.id, {
    eager: true,
  })
  @JoinColumn({ name: 'group_id' })
  group: GroupEntity;

  @Column({ name: 'is_admin' })
  isAdmin: boolean;

  @Column({ name: 'user_id' })
  userId: string;
}
