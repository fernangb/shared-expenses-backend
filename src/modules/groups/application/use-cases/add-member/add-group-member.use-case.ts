import { IBaseUseCase } from 'src/shared/use-cases/base.use-case';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IGroupRepository } from 'src/modules/groups/domain/repositories/group.repository';
import { IGroupMemberRepository } from 'src/modules/groups/domain/repositories/group-member.repository';
import { GroupMemberEntity } from 'src/modules/groups/domain/entities/group-member.entity';
import { ServiceEnum } from 'src/shared/enums/services';
import { RepositoryEnum } from 'src/shared/enums/repositories';
import { IUserService } from 'src/modules/users/domain/services/user.service';
import {
  AddGroupMemberInputDTO,
  AddGroupMemberOutputDTO,
} from 'src/modules/groups/infra/http/dtos/add-group-member.dto';

@Injectable()
export class AddGroupMemberUseCase
  implements IBaseUseCase<AddGroupMemberInputDTO, AddGroupMemberOutputDTO>
{
  constructor(
    @Inject(ServiceEnum.USER)
    private readonly userService: IUserService,
    @Inject(RepositoryEnum.GROUP)
    private readonly groupRepository: IGroupRepository,
    @Inject(RepositoryEnum.GROUP_MEMBER)
    private readonly groupMemberRepository: IGroupMemberRepository,
  ) {}

  async handle({
    groupId,
    adminId,
    memberEmail,
  }: AddGroupMemberInputDTO): Promise<AddGroupMemberOutputDTO> {
    const group = await this.groupRepository.findById(groupId);

    if (!group) throw new BadRequestException('This group does not exists');

    const requestedGroupMember = await this.groupMemberRepository.findById(
      adminId,
      group.id,
    );

    if (!requestedGroupMember) throw new BadRequestException('Invalid group');

    if (!requestedGroupMember.isAdmin)
      throw new BadRequestException('Only admin can add users');

    const newMember = await this.userService.findByEmail(memberEmail);

    if (!newMember)
      throw new BadRequestException('This member does not exists');

    if (requestedGroupMember.id === newMember.id)
      throw new BadRequestException('You cannnot add yourself to the group');

    const alreadyAddedGroupMember = await this.groupMemberRepository.findById(
      newMember.id,
      group.id,
    );

    if (alreadyAddedGroupMember)
      throw new BadRequestException(
        'This member is already added to the group',
      );

    const groupMember = new GroupMemberEntity({
      group,
      isAdmin: false,
      userId: newMember.id,
    });

    await this.groupMemberRepository.create(groupMember);
  }
}
