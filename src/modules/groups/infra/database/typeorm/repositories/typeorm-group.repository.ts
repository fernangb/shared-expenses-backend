import { InjectRepository } from '@nestjs/typeorm';
import { TypeormGroupModel } from '../models/typeorm-group.model';
import { Repository } from 'typeorm';
import { TypeormGroupMapper } from '../mappers/typeorm-group.mapper';
import { GroupEntity } from '../../../../domain/entities/group.entity';
import { IGroupRepository } from '../../../../domain/repositories/group.repository';
import { TypeormGroupMemberModel } from '../models/typeorm-group-member.model';

export class TypeormGroupRepository implements IGroupRepository {
  constructor(
    @InjectRepository(TypeormGroupModel)
    private repository: Repository<TypeormGroupModel>,
  ) {}

  async create(entity: GroupEntity): Promise<void> {
    const model = TypeormGroupMapper.toModel(entity);

    await this.repository.save(this.repository.create(model));
  }

  async findById(id: string): Promise<GroupEntity> {
    const model = await this.repository.findOne({ where: { id } });

    return TypeormGroupMapper.toEntity(model);
  }

  async findByUserId(userId: string): Promise<GroupEntity[]> {
    const models = await this.repository
      .createQueryBuilder('g')
      .leftJoin(TypeormGroupMemberModel, 'gm', 'g.id = gm.group_id')
      .where('gm.user_id = :userId', { userId })
      .getMany();
    return TypeormGroupMapper.toEntityList(models);
  }
}
