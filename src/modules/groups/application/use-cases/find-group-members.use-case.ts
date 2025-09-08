import { IBaseUseCase } from '../../../../shared/use-cases/base.use-case';
import { Inject, Injectable } from '@nestjs/common';
import { IGroupRepository } from '../../domain/repositories/group.repository';
import { ServiceEnum } from '../../../../shared/enums/services';
import { RepositoryEnum } from '../../../../shared/enums/repositories';
import { IUserService } from '../../../users/domain/services/user.service';
import {
  FindGroupMembersInputDTO,
  FindGroupMembersOutputDTO,
} from '../../infra/http/dtos/find-group-members.dto';
import { IGroupMemberRepository } from '../../domain/repositories/group-member.repository';
import { UserNotExistsError } from '../../../../modules/users/application/errors/user-not-exists.error';
import { GroupNotExistsError } from '../errors/group-not-exists.error';
import { InvalidGroupMemberError } from '../errors/invalid-group-member.error';

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

    if (!user) throw new UserNotExistsError();

    const group = await this.groupRepository.findById(groupId);

    if (!group) throw new GroupNotExistsError();

    const groupMembers = await this.groupMemberRepository.findByGroupId(
      groupId,
    );

    const isMember = groupMembers.find((member) => member.userId === userId);

    if (!isMember) throw new InvalidGroupMemberError();

    return { groupMembers };
  }
}
