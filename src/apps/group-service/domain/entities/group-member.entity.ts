import { BaseEntityProps, BaseEntity } from 'src/shared/entities/base.entity';
import { GroupEntity } from './group.entity';

interface GroupMemberProps extends BaseEntityProps {
  userId: string;
  isAdmin: boolean;
  group: GroupEntity;
}

export class GroupMemberEntity extends BaseEntity {
  userId: string;
  isAdmin: boolean;
  group: GroupEntity;

  constructor(props: GroupMemberProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });

    this.userId = props.userId;
    this.isAdmin = props.isAdmin;
    this.group = props.group;
  }
}
