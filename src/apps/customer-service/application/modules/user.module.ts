import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../services/user.service';
import { TypeormUserRepository } from '../../infra/database/typeorm/repositories/typeorm-user.repository';
import { TypeormUserModel } from '../../infra/database/typeorm/models/typeorm-user.model';
import { RepositoryEnum } from '../../../../shared/enums/repositories';
import { ServiceEnum } from 'src/shared/enums/services';

@Module({
  imports: [TypeOrmModule.forFeature([TypeormUserModel])],
  controllers: [],
  providers: [
    {
      provide: RepositoryEnum.USER,
      useClass: TypeormUserRepository,
    },
    {
      provide: ServiceEnum.USER,
      useClass: UserService,
    },
  ],
  exports: [ServiceEnum.USER],
})
export class UserModule {}
