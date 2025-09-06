import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGroupInputDTO {
  @ApiProperty({ example: '1' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'Home expenses' })
  @IsString()
  name: string;
}

export type CreateGroupOutputDTO = void;
