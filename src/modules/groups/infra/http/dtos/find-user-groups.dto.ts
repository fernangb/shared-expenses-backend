import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { GroupEntity } from 'src/modules/groups/domain/entities/group.entity';

export class FindUserGroupsInputDTO {
  @ApiProperty({ example: '1' })
  @IsString()
  userId: string;
}

export class FindUserGroupsOutputDTO {
  @ApiProperty({
    example: [
      {
        id: '1',
        name: 'Group 1',
        createdUserId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as GroupEntity,
    ],
  })
  @IsArray()
  groups: GroupEntity[];
}
