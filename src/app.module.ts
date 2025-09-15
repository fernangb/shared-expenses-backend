import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/modules/database.module';
import { GroupModule } from './modules/groups/infra/http/group.module';
import { UserModule } from './modules/users/infra/http/user.module';
import { AuthModule } from './modules/auth/infra/http/auth.module';
import { ExpenseModule } from './modules/expenses/infra/http/expense.module';
import { IdentityModule } from './module/identity/identity.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    DatabaseModule,
    ExpenseModule,
    GroupModule,
    UserModule,
  ],
})
export class AppModule {}
