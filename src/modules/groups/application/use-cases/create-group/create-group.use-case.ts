import { IBaseUseCase } from '../../../../../shared/use-cases/base.use-case';
import {
  CreateGroupInputDTO,
  CreateGroupOutputDTO,
} from '../../../infra/http/dtos/create-group.dto';
import { Inject, Injectable } from '@nestjs/common';
import { GroupEntity } from '../../../../../modules/groups/domain/entities/group.entity';
import { IGroupRepository } from '../../../../../modules/groups/domain/repositories/group.repository';
import { IGroupMemberRepository } from '../../../../../modules/groups/domain/repositories/group-member.repository';
import { GroupMemberEntity } from '../../../../../modules/groups/domain/entities/group-member.entity';
import { ServiceEnum } from '../../../../../shared/enums/services';
import { RepositoryEnum } from '../../../../../shared/enums/repositories';
import { IUserService } from '../../../../../modules/users/domain/services/user.service';
import { UserNotExistsError } from '../../../../../modules/users/application/errors/user-not-exists.error';

@Injectable()
export class CreateGroupUseCase
  implements IBaseUseCase<CreateGroupInputDTO, CreateGroupOutputDTO>
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
    name,
  }: CreateGroupInputDTO): Promise<CreateGroupOutputDTO> {
    const user = await this.userService.findById(userId);

    if (!user) throw new UserNotExistsError();

    const group = new GroupEntity({ name, createdUserId: userId });

    const groupMember = new GroupMemberEntity({
      group,
      userId,
      isAdmin: true,
    });

    await this.groupRepository.create(group);
    await this.groupMemberRepository.create(groupMember);
  }
}
