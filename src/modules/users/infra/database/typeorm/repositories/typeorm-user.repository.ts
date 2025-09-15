import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TypeormUserModel } from '../models/typeorm-user.model';
import { TypeormUserMapper } from '../mappers/typeorm-user.mapper';
import { UserEntity } from '../../../../../../modules/users/domain/entities/user.entity';
import { TypeormBaseRepository } from 'src/shared/modules/database/typeorm/typeorm-base.repository';

export class TypeormUserRepository extends TypeormBaseRepository<TypeormUserModel> {
  constructor(
    @InjectDataSource('users')
    dataSource: DataSource,
  ) {
    super(TypeormUserModel, dataSource.manager);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const model = await this.findOne({ where: { email } });

    return TypeormUserMapper.toEntity(model);
  }

  async findByPhone(phone: string): Promise<UserEntity> {
    const model = await this.findOne({ where: { phone } });

    return TypeormUserMapper.toEntity(model);
  }
}
