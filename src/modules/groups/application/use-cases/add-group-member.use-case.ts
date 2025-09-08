import { IBaseUseCase } from '../../../../shared/use-cases/base.use-case';
import { Inject, Injectable } from '@nestjs/common';
import { IGroupRepository } from '../../../../modules/groups/domain/repositories/group.repository';
import { IGroupMemberRepository } from '../../../../modules/groups/domain/repositories/group-member.repository';
import { GroupMemberEntity } from '../../../../modules/groups/domain/entities/group-member.entity';
import { ServiceEnum } from '../../../../shared/enums/services';
import { RepositoryEnum } from '../../../../shared/enums/repositories';
import { IUserService } from '../../../../modules/users/domain/services/user.service';
import {
  AddGroupMemberInputDTO,
  AddGroupMemberOutputDTO,
} from '../../../../modules/groups/infra/http/dtos/add-group-member.dto';
import { GroupNotExistsError } from '../errors/group-not-exists.error';
import { InvalidGroupError } from '../errors/inavlid-group.error';
import { OnlyAdminCanAddUserError } from '../errors/only-admin-can-add-user.error';
import { GroupMemberNotExistsError } from '../errors/group-member-not-exists.error';
import { AddYourselfError } from '../errors/add-yourself-error';
import { AlreadyAddedError } from '../errors/already-added.error';

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

    if (!group) throw new GroupNotExistsError();

    const requestedGroupMember = await this.groupMemberRepository.findById(
      adminId,
      group.id,
    );

    if (!requestedGroupMember) throw new InvalidGroupError();

    if (!requestedGroupMember.isAdmin) throw new OnlyAdminCanAddUserError();

    const newMember = await this.userService.findByEmail(memberEmail);

    if (!newMember) throw new GroupMemberNotExistsError();

    if (requestedGroupMember.id === newMember.id) throw new AddYourselfError();

    const alreadyAddedGroupMember = await this.groupMemberRepository.findById(
      newMember.id,
      group.id,
    );

    if (alreadyAddedGroupMember) throw new AlreadyAddedError();

    const groupMember = new GroupMemberEntity({
      group,
      isAdmin: false,
      userId: newMember.id,
    });

    await this.groupMemberRepository.create(groupMember);
  }
}
