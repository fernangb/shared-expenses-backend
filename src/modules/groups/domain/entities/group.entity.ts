import { BaseEntityProps, BaseEntity } from 'src/shared/entities/base.entity';

interface GroupProps extends BaseEntityProps {
  name: string;
  createdUserId: string;
}

export class GroupEntity extends BaseEntity {
  name: string;
  createdUserId: string;

  constructor(props: GroupProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });

    this.name = props.name;
    this.createdUserId = props.createdUserId;
  }
}
