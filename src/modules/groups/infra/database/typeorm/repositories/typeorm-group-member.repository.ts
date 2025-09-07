import { InjectRepository } from '@nestjs/typeorm';
import { GroupMemberEntity } from 'src/modules/groups/domain/entities/group-member.entity';
import { IGroupMemberRepository } from 'src/modules/groups/domain/repositories/group-member.repository';
import { Repository } from 'typeorm';
import { TypeormGroupMemberMapper } from '../mappers/typeorm-group-member.mapper';
import { TypeormGroupMemberModel } from '../models/typeorm-group-member.model';

export class TypeormGroupMemberRepository implements IGroupMemberRepository {
  constructor(
    @InjectRepository(TypeormGroupMemberModel)
    private repository: Repository<TypeormGroupMemberModel>,
  ) {}

  async create(entity: GroupMemberEntity): Promise<void> {
    const model = TypeormGroupMemberMapper.toModel(entity);

    await this.repository.save(this.repository.create(model));
  }
}
