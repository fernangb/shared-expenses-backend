import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddGroupMemberInputDTO {
  @ApiProperty({ example: '1' })
  @IsString()
  groupId: string;

  @ApiProperty({ example: '1' })
  @IsString()
  adminId: string;

  @ApiProperty({ example: '1' })
  @IsString()
  memberEmail: string;
}

export type AddGroupMemberOutputDTO = void;
