import { Module } from '@nestjs/common';
import { GroupModule } from './modules/groups/infra/http/group.module';
import { UserModule } from './modules/users/infra/http/user.module';
import { AuthModule } from './modules/auth/infra/http/auth.module';
import { ExpenseModule } from './modules/expenses/infra/http/expense.module';
import { DatabaseModule } from './shared/modules/database/database.module';
import { ConfigModule } from './shared/modules/config/config.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    DatabaseModule,
    ExpenseModule,
    GroupModule,
    UserModule,
  ],
})
export class AppModule {}
