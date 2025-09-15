import { DynamicModule, Module } from '@nestjs/common';
import { TypeormDatabaseModule } from './database/typeorm/typeorm-database.module';
import { TypeormUserAuthModel } from 'src/modules/auth/infra/database/typeorm/models/typeorm-user-auth.model';
import { TypeormUserAuthRepository } from 'src/modules/auth/infra/database/typeorm/repositories/typeorm-user-auth.repository';
import { TypeormExpenseModel } from 'src/modules/expenses/infra/database/typeorm/models/typeorm-expense.model';
import { TypeormSplitExpenseModel } from 'src/modules/expenses/infra/database/typeorm/models/typeorm-split-expense.model';
import { TypeormExpenseRepository } from 'src/modules/expenses/infra/database/typeorm/repositories/typeorm-expense.repository';
import { TypeormSplitExpenseRepository } from 'src/modules/expenses/infra/database/typeorm/repositories/typeorm-split-expense.repository';
import { TypeormGroupMemberModel } from 'src/modules/groups/infra/database/typeorm/models/typeorm-group-member.model';
import { TypeormGroupModel } from 'src/modules/groups/infra/database/typeorm/models/typeorm-group.model';
import { TypeormGroupMemberRepository } from 'src/modules/groups/infra/database/typeorm/repositories/typeorm-group-member.repository';
import { TypeormGroupRepository } from 'src/modules/groups/infra/database/typeorm/repositories/typeorm-group.repository';
import { TypeormUserModel } from 'src/modules/users/infra/database/typeorm/models/typeorm-user.model';
import { TypeormUserRepository } from 'src/modules/users/infra/database/typeorm/repositories/typeorm-user.repository';

@Module({})
export class DatabaseModule {
  static forRoot(opts?: { migrations?: string[] }): DynamicModule {
    const { migrations } = opts || {};
    return {
      module: DatabaseModule,
      imports: [
        TypeormDatabaseModule.forRoot({
          migrations,
          entities: [
            TypeormExpenseModel,
            TypeormGroupModel,
            TypeormGroupMemberModel,
            TypeormSplitExpenseModel,
            TypeormUserModel,
            TypeormUserAuthModel,
          ],
        }),
      ],
      providers: [
        TypeormExpenseRepository,
        TypeormGroupRepository,
        TypeormGroupMemberRepository,
        TypeormSplitExpenseRepository,
        TypeormUserRepository,
        TypeormUserAuthRepository,
      ],
      exports: [
        TypeormExpenseRepository,
        TypeormGroupRepository,
        TypeormGroupMemberRepository,
        TypeormSplitExpenseRepository,
        TypeormUserRepository,
        TypeormUserAuthRepository,
      ],
    };
  }
}
