import { Inject, Injectable } from '@nestjs/common';
import { RepositoryEnum } from '../../../../shared/enums/repositories';
import { IGroupService } from '../../domain/services/group.service';
import { IGroupRepository } from '../../domain/repositories/group.repository';
import { GroupEntity } from '../../domain/entities/group.entity';

@Injectable()
export class GroupService implements IGroupService {
  constructor(
    @Inject(RepositoryEnum.GROUP)
    private readonly repository: IGroupRepository,
  ) {}

  async findById(id: string): Promise<GroupEntity> {
    return this.repository.findById(id);
  }
}
