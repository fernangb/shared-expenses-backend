import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateGroupController } from '../../infra/http/controllers/create-group-controller';
import { RepositoryEnum } from 'src/shared/enums/repositories';
import { TypeormGroupModel } from '../../infra/database/typeorm/models/typeorm-group.model';
import { TypeormGroupMemberModel } from '../../infra/database/typeorm/models/typeorm-group-member.model';
import { TypeormGroupRepository } from '../../infra/database/typeorm/repositories/typeorm-group.repository';
import { TypeormGroupMemberRepository } from '../../infra/database/typeorm/repositories/typeorm-group-member.repository';

import { CreateGroupUseCase } from '../../application/use-cases/create-group/create-group.use-case';
import { UserModule } from 'src/modules/users/infra/http/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeormGroupModel, TypeormGroupMemberModel]),
    UserModule,
  ],
  controllers: [CreateGroupController],
  providers: [
    CreateGroupUseCase,
    {
      provide: RepositoryEnum.GROUP,
      useClass: TypeormGroupRepository,
    },
    {
      provide: RepositoryEnum.GROUP_MEMBER,
      useClass: TypeormGroupMemberRepository,
    },
  ],
  exports: [],
})
export class GroupModule {}
