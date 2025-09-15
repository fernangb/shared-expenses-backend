import { GroupEntity } from 'src/modules/groups/domain/entities/group.entity';
import { TypeormBaseModel } from 'src/shared/modules/database/typeorm/typeorm-base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'groups' })
export class TypeormGroupModel extends TypeormBaseModel<GroupEntity> {
  @Column()
  name: string;

  @Column({ name: 'created_user_id' })
  createdUserId: string;
}
