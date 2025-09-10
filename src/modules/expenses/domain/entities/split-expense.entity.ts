import { Money } from '../../../../shared/value-objects/money.vo';
import {
  BaseEntityProps,
  BaseEntity,
} from '../../../../shared/entities/base.entity';

interface SplitExpenseProps extends BaseEntityProps {
  expenseId: string;
  userId: string;
  groupId: string;
  value: number;
}

export class SplitExpenseEntity extends BaseEntity {
  expenseId: string;
  userId: string;
  groupId: string;
  value: number;

  constructor(props: SplitExpenseProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });

    this.expenseId = props.expenseId;
    this.userId = props.userId;
    this.groupId = props.groupId;
    this.value = new Money(props.value).value;
  }
}
