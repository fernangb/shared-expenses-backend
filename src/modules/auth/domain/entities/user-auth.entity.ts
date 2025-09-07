import { UserEntity } from '../../../../modules/users/domain/entities/user.entity';
import {
  BaseEntity,
  BaseEntityProps,
} from '../../../../shared/entities/base.entity';

interface UserAuthProps extends BaseEntityProps {
  user: UserEntity;
  password: string;
}

export class UserAuthEntity extends BaseEntity {
  user: UserEntity;
  password: string;

  constructor(props: UserAuthProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });

    this.user = props.user;
    this.password = props.password;
  }
}
