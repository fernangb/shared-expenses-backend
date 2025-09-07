import { IBaseUseCase } from '../../../../../shared/use-cases/base.use-case';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IGroupRepository } from '../../../../../modules/groups/domain/repositories/group.repository';
import { ServiceEnum } from '../../../../../shared/enums/services';
import { RepositoryEnum } from '../../../../../shared/enums/repositories';
import { IUserService } from '../../../../../modules/users/domain/services/user.service';
import {
  FindUserGroupsInputDTO,
  FindUserGroupsOutputDTO,
} from '../../../../../modules/groups/infra/http/dtos/find-user-groups.dto';

@Injectable()
export class FindUserGroupsUseCase
  implements IBaseUseCase<FindUserGroupsInputDTO, FindUserGroupsOutputDTO>
{
  constructor(
    @Inject(ServiceEnum.USER)
    private readonly userService: IUserService,
    @Inject(RepositoryEnum.GROUP)
    private readonly groupRepository: IGroupRepository,
  ) {}

  async handle({
    userId,
  }: FindUserGroupsInputDTO): Promise<FindUserGroupsOutputDTO> {
    const user = await this.userService.findById(userId);

    if (!user) throw new BadRequestException('User not exists');

    const groups = await this.groupRepository.findByUserId(userId);

    return { groups };
  }
}
