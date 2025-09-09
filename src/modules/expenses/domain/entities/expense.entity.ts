import { Money } from '../../../../shared/value-objects/money.vo';
import {
  BaseEntityProps,
  BaseEntity,
} from '../../../../shared/entities/base.entity';

interface ExpenseProps extends BaseEntityProps {
  name: string;
  description?: string;
  value: number;
  dueDate?: Date;
  paymentDate?: Date;
  userId: string;
  groupId: string;
}

export class ExpenseEntity extends BaseEntity {
  name: string;
  description?: string;
  value: number;
  dueDate?: Date;
  paymentDate?: Date;
  userId: string;
  groupId: string;

  constructor(props: ExpenseProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });

    this.name = props.name;
    this.description = props.description;
    this.value = new Money(props.value).value;
    this.dueDate = props.dueDate;
    this.paymentDate = props.paymentDate;
    this.userId = props.userId;
    this.groupId = props.groupId;
  }
}
