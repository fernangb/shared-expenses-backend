import { InjectDataSource } from '@nestjs/typeorm';
import { GroupMemberEntity } from '../../../../../../modules/groups/domain/entities/group-member.entity';
import { DataSource } from 'typeorm';
import { TypeormGroupMemberMapper } from '../mappers/typeorm-group-member.mapper';
import { TypeormGroupMemberModel } from '../models/typeorm-group-member.model';
import { TypeormBaseRepository } from 'src/shared/modules/database/typeorm/typeorm-base.repository';

export class TypeormGroupMemberRepository extends TypeormBaseRepository<TypeormGroupMemberModel> {
  constructor(
    @InjectDataSource('group_members')
    dataSource: DataSource,
  ) {
    super(TypeormGroupMemberModel, dataSource.manager);
  }

  async findByGroupId(groupId: string): Promise<GroupMemberEntity[]> {
    const models = await this.find({ where: { groupId } });

    return TypeormGroupMemberMapper.toEntityList(models);
  }
}
