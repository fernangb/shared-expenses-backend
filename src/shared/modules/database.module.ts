import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormUserAuthModel } from '../../modules/auth/infra/database/typeorm/models/typeorm-user-auth.model';
import { TypeormGroupMemberModel } from '../../modules/groups/infra/database/typeorm/models/typeorm-group-member.model';
import { TypeormGroupModel } from '../../modules/groups/infra/database/typeorm/models/typeorm-group.model';
import { TypeormUserModel } from '../../modules/users/infra/database/typeorm/models/typeorm-user.model';
import { TypeormExpenseModel } from '../../modules/expenses/infra/database/typeorm/models/typeorm-expense.model';
import { TypeormSplitExpenseModel } from '../../modules/expenses/infra/database/typeorm/models/typeorm-split-expense.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        TypeormExpenseModel,
        TypeormGroupModel,
        TypeormGroupMemberModel,
        TypeormSplitExpenseModel,
        TypeormUserModel,
        TypeormUserAuthModel,
      ],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
