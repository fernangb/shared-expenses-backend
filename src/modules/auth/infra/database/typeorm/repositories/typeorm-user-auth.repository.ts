import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeormUserAuthModel } from '../models/typeorm-user-auth.model';
import { IUserAuthRepository } from 'src/modules/auth/domain/repositories/user-auth.repository';
import { TypeormUserAuthMapper } from '../mappers/typeorm-user-auth.mapper';
import { UserAuthEntity } from 'src/modules/auth/domain/entities/user-auth.entity';

export class TypeormUserAuthRepository implements IUserAuthRepository {
  constructor(
    @InjectRepository(TypeormUserAuthModel)
    private repository: Repository<TypeormUserAuthModel>,
  ) {}

  async create(entity: UserAuthEntity): Promise<void> {
    const model = TypeormUserAuthMapper.toModel(entity);

    await this.repository.save(this.repository.create(model));
  }

  async findByEmail(email: string): Promise<UserAuthEntity> {
    const model = await this.repository.findOne({ where: { user: { email } } });

    return TypeormUserAuthMapper.toEntity(model);
  }
}
