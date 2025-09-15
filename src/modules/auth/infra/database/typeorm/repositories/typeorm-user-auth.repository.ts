import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TypeormUserAuthModel } from '../models/typeorm-user-auth.model';
import { TypeormUserAuthMapper } from '../mappers/typeorm-user-auth.mapper';
import { UserAuthEntity } from '../../../../../../modules/auth/domain/entities/user-auth.entity';
import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/modules/database/typeorm/typeorm-base.repository';

@Injectable()
export class TypeormUserAuthRepository extends TypeormBaseRepository<TypeormUserAuthModel> {
  constructor(
    @InjectDataSource('user_auth')
    dataSource: DataSource,
  ) {
    super(TypeormUserAuthModel, dataSource.manager);
  }

  async findByEmail(email: string): Promise<TypeormUserAuthModel | null> {
    return await this.findOne({ where: { user: { email } } });

    // return TypeormUserAuthMapper.toEntity(model);
  }
}
