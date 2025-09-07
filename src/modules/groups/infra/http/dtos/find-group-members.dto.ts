import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { GroupMemberEntity } from '../../../../../modules/groups/domain/entities/group-member.entity';
import { GroupEntity } from '../../../../../modules/groups/domain/entities/group.entity';

export class FindGroupMembersInputDTO {
  @ApiProperty({ example: '1' })
  @IsString()
  userId: string;

  @ApiProperty({ example: '1' })
  @IsString()
  groupId: string;
}

export class FindGroupMembersOutputDTO {
  @ApiProperty({
    example: [
      {
        id: '1',
        isAdmin: true,
        userId: '1',
        group: {
          id: '1',
          name: 'Group 1',
          createdUserId: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
        } as GroupEntity,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as GroupMemberEntity,
    ],
  })
  @IsArray()
  groupMembers: GroupMemberEntity[];
}
