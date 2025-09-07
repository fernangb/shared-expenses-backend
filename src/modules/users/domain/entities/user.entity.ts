import { Email } from '../../../../shared/value-objects/email.vo';
import {
  BaseEntity,
  BaseEntityProps,
} from '../../../../shared/entities/base.entity';

interface UserProps extends BaseEntityProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export class UserEntity extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  constructor(props: UserProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });

    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.email = new Email(props.email).value;
    this.phone = props.phone;
  }
}
