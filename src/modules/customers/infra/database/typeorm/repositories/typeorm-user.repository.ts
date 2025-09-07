import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/customers/domain/entities/user.entity';
import { IUserRepository } from 'src/modules/customers/domain/repositories/user.repository';
import { Repository } from 'typeorm';
import { TypeormUserModel } from '../models/typeorm-user.model';
import { TypeormUserMapper } from '../mappers/typeorm-user.mapper';

export class TypeormUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(TypeormUserModel)
    private repository: Repository<TypeormUserModel>,
  ) {}

  async findById(id: string): Promise<UserEntity> {
    const model = await this.repository.findOne({ where: { id } });

    return TypeormUserMapper.toEntity(model);
  }
}
