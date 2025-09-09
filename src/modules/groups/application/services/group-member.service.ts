import { Inject, Injectable } from '@nestjs/common';
import { RepositoryEnum } from '../../../../shared/enums/repositories';
import { IGroupMemberService } from '../../domain/services/group-member.service';
import { IGroupMemberRepository } from '../../domain/repositories/group-member.repository';
import { GroupMemberEntity } from '../../domain/entities/group-member.entity';

@Injectable()
export class GroupMemberService implements IGroupMemberService {
  constructor(
    @Inject(RepositoryEnum.GROUP_MEMBER)
    private readonly repository: IGroupMemberRepository,
  ) {}

  async findByGroupId(groupId: string): Promise<GroupMemberEntity[]> {
    return this.repository.findByGroupId(groupId);
  }
}
