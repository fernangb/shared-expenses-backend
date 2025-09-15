import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GroupEntity } from '../../../../domain/entities/group.entity';
import { TypeormGroupMemberModel } from '../models/typeorm-group-member.model';
import { TypeormBaseRepository } from 'src/shared/modules/database/typeorm/typeorm-base.repository';

export class TypeormGroupRepository extends TypeormBaseRepository<TypeormGroupMemberModel> {
  constructor(
    @InjectDataSource('groups')
    dataSource: DataSource,
  ) {
    super(TypeormGroupMemberModel, dataSource.manager);
  }

  async findByUserId(userId: string): Promise<GroupEntity[]> {
    // const models = await this.entity
    //   .createQueryBuilder('g')
    //   .leftJoin(TypeormGroupMemberModel, 'gm', 'g.id = gm.group_id')
    //   .where('gm.user_id = :userId', { userId })
    //   .getMany();
    // return TypeormGroupMapper.toEntityList(models);

    return [];
  }
}
