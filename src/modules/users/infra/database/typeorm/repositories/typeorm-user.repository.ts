import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeormUserModel } from '../models/typeorm-user.model';
import { TypeormUserMapper } from '../mappers/typeorm-user.mapper';
import { IUserRepository } from 'src/modules/users/domain/repositories/user.repository';
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';

export class TypeormUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(TypeormUserModel)
    private repository: Repository<TypeormUserModel>,
  ) {}

  async create(entity: UserEntity): Promise<void> {
    const model = TypeormUserMapper.toModel(entity);

    await this.repository.save(this.repository.create(model));
  }

  async findById(id: string): Promise<UserEntity> {
    const model = await this.repository.findOne({ where: { id } });

    return TypeormUserMapper.toEntity(model);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const model = await this.repository.findOne({ where: { email } });

    return TypeormUserMapper.toEntity(model);
  }

  async findByPhone(phone: string): Promise<UserEntity> {
    const model = await this.repository.findOne({ where: { phone } });

    return TypeormUserMapper.toEntity(model);
  }
}
