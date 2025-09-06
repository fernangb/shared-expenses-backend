import { GroupEntity } from 'src/apps/group-service/domain/entities/group.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeormGroupModel } from './typeorm-group.model';

@Entity({ name: 'group_members' })
export class TypeormGroupMemberModel {
  @PrimaryColumn('uuid')
  id: string;

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
