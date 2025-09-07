import { TypeormUserModel } from '../../../../../../modules/users/infra/database/typeorm/models/typeorm-user.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user_auth' })
export class TypeormUserAuthModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => TypeormUserModel, (model) => model.id, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: TypeormUserModel;

  @Column()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
