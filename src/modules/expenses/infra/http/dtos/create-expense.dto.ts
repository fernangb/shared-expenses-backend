import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateExpenseInputDTO {
  @ApiProperty({ example: '1' })
  @IsString()
  userId: string;

  @ApiProperty({ example: '1' })
  @IsString()
  groupId: string;

  @ApiProperty({ example: 'Home' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Home', required: false })
  @IsString()
  description: string;

  @ApiProperty({ example: 9.99, minimum: 0 })
  @IsNumber()
  value: number;

  @ApiProperty({ example: new Date(), required: false })
  @IsDate()
  dueDate: Date;

  @ApiProperty({ example: new Date(), required: false })
  @IsDate()
  paymentDate: Date;
}

export type CreateExpenseOutputDTO = void;
