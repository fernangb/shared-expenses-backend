import { InjectRepository } from '@nestjs/typeorm';
import { TypeormGroupModel } from '../models/typeorm-group.model';
import { Repository } from 'typeorm';
import { TypeormGroupMapper } from '../mappers/typeorm-group.mapper';
import { GroupEntity } from '../../../../domain/entities/group.entity';
import { IGroupRepository } from '../../../../domain/repositories/group.repository';

export class TypeormGroupRepository implements IGroupRepository {
  constructor(
    @InjectRepository(TypeormGroupModel)
    private repository: Repository<TypeormGroupModel>,
  ) {}

  async create(entity: GroupEntity): Promise<void> {
    const model = TypeormGroupMapper.toModel(entity);

    await this.repository.save(this.repository.create(model));
  }
}
