import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateGroupController } from './controllers/create-group.controller';
import { RepositoryEnum } from '../../../../shared/enums/repositories';
import { TypeormGroupModel } from '../../infra/database/typeorm/models/typeorm-group.model';
import { TypeormGroupMemberModel } from '../../infra/database/typeorm/models/typeorm-group-member.model';
import { TypeormGroupRepository } from '../../infra/database/typeorm/repositories/typeorm-group.repository';
import { TypeormGroupMemberRepository } from '../../infra/database/typeorm/repositories/typeorm-group-member.repository';
import { CreateGroupUseCase } from '../../application/use-cases/create-group/create-group.use-case';
import { UserModule } from '../../../../modules/users/infra/http/user.module';
import { AddGroupMemberUseCase } from '../../application/use-cases/add-member/add-group-member.use-case';
import { AddGroupMemberController } from './controllers/add-group-member.controller';
import { FindGroupMembersController } from './controllers/find-group-members.controller';
import { FindUserGroupsController } from './controllers/find-user-groups.controller';
import { FindGroupMembersUseCase } from '../../application/use-cases/find-group-members/find-group-members.use-case';
import { FindUserGroupsUseCase } from '../../application/use-cases/find-user-groups/find-user-groups.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeormGroupModel, TypeormGroupMemberModel]),
    UserModule,
  ],
  controllers: [
    AddGroupMemberController,
    CreateGroupController,
    FindGroupMembersController,
    FindUserGroupsController,
  ],
  providers: [
    AddGroupMemberUseCase,
    CreateGroupUseCase,
    FindGroupMembersUseCase,
    FindUserGroupsUseCase,
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
