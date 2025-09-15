import { TypeormBaseModel } from 'src/shared/modules/database/typeorm/typeorm-base.entity';
import { TypeormUserModel } from '../../../../../../modules/users/infra/database/typeorm/models/typeorm-user.model';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserAuthEntity } from 'src/modules/auth/domain/entities/user-auth.entity';

@Entity({ name: 'user_auth' })
export class TypeormUserAuthModel extends TypeormBaseModel<UserAuthEntity> {
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => TypeormUserModel, (model) => model.id, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: TypeormUserModel;

  @Column()
  password: string;
}
