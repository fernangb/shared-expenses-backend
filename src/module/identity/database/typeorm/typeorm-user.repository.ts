import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DefaultTypeOrmRepository } from 'src/module/shared/module/database/typeorm/repository/default-typeorm.repository';
import { DataSource } from 'typeorm';
import { UserEntity } from '../../core/entity/user.entity';

@Injectable()
export class TypeOrmUserRepository extends DefaultTypeOrmRepository<UserEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return this.findOne({
      where: {
        email,
      },
    });
  }

  async findOneByPhone(phone: string): Promise<UserEntity | null> {
    return this.findOne({
      where: {
        phone,
      },
    });
  }
}
