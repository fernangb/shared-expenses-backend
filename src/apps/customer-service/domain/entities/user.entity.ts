import {
  BaseEntity,
  BaseEntityProps,
} from '../../../../shared/entities/base.entity';

interface UserProps extends BaseEntityProps {
  name: string;
}

export class UserEntity extends BaseEntity {
  name: string;

  constructor(props: UserProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });

    this.name = props.name;
  }
}
