import { IBaseUseCase } from 'src/shared/use-cases/base.use-case';
import {
  CreateGroupInputDTO,
  CreateGroupOutputDTO,
} from '../../../infra/http/dtos/create-group.dto';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { GroupEntity } from 'src/modules/groups/domain/entities/group.entity';
import { IGroupRepository } from 'src/modules/groups/domain/repositories/group.repository';
import { IGroupMemberRepository } from 'src/modules/groups/domain/repositories/group-member.repository';
import { GroupMemberEntity } from 'src/modules/groups/domain/entities/group-member.entity';
import { ServiceEnum } from 'src/shared/enums/services';
import { RepositoryEnum } from 'src/shared/enums/repositories';
import { IUserService } from 'src/modules/users/domain/services/user.service';

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

    if (!user) throw new BadRequestException('User not exists');

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
