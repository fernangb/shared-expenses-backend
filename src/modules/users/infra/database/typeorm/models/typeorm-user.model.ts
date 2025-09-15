import { UserEntity } from 'src/modules/users/domain/entities/user.entity';
import { TypeormBaseModel } from 'src/shared/modules/database/typeorm/typeorm-base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class TypeormUserModel extends TypeormBaseModel<UserEntity> {
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;
}
