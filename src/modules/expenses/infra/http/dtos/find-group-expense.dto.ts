import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { ExpenseEntity } from '../../../../../modules/expenses/domain/entities/expense.entity';

export class FindGroupExpenseInputDTO {
  @ApiProperty({ example: '1' })
  @IsString()
  groupId: string;

  @ApiProperty({ example: '1' })
  @IsString()
  userId: string;
}

export class FindGroupExpenseOutputDTO {
  @ApiProperty({
    example: [
      {
        id: '1',
        groupId: '1',
        name: 'Fake expense',
        userId: '1',
        value: 100,
        description: 'Fake description',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as ExpenseEntity,
    ],
  })
  @IsArray()
  expenses: ExpenseEntity[];
}
