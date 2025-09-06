import { UUID } from '../value-objects/uuid.vo';

export interface BaseEntityProps {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: BaseEntityProps) {
    this.id = props.id ? props.id : new UUID(props.id).value;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || this.createdAt;
  }
}
