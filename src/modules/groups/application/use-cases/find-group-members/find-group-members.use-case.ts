import { IBaseUseCase } from '../../../../../shared/use-cases/base.use-case';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IGroupRepository } from '../../../../../modules/groups/domain/repositories/group.repository';
import { ServiceEnum } from '../../../../../shared/enums/services';
import { RepositoryEnum } from '../../../../../shared/enums/repositories';
import { IUserService } from '../../../../../modules/users/domain/services/user.service';
import {
  FindGroupMembersInputDTO,
  FindGroupMembersOutputDTO,
} from '../../../../../modules/groups/infra/http/dtos/find-group-members.dto';
import { IGroupMemberRepository } from '../../../../../modules/groups/domain/repositories/group-member.repository';

@Injectable()
export class FindGroupMembersUseCase
  implements IBaseUseCase<FindGroupMembersInputDTO, FindGroupMembersOutputDTO>
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
    userId,
    groupId,
  }: FindGroupMembersInputDTO): Promise<FindGroupMembersOutputDTO> {
    const user = await this.userService.findById(userId);

    if (!user) throw new BadRequestException('User not exists');

    const group = await this.groupRepository.findById(groupId);

    if (!group) throw new BadRequestException('Group not exists');

    const groupMembers = await this.groupMemberRepository.findByGroupId(
      groupId,
    );

    const isMember = groupMembers.find((member) => member.userId === userId);

    if (!isMember)
      throw new BadRequestException('This user is not a part of this group');

    return { groupMembers };
  }
}
