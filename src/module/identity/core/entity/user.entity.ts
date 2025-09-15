import { DefaultEntity } from 'src/module/shared/module/database/typeorm/entity/default.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'User' })
export class UserEntity extends DefaultEntity<UserEntity> {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;
}
