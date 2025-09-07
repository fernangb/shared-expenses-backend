import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/modules/database.module';
import { GroupModule } from './modules/groups/infra/http/group.module';
import { UserModule } from './modules/users/infra/http/user.module';
import { AuthModule } from './modules/auth/infra/http/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    DatabaseModule,
    GroupModule,
    UserModule,
  ],
})
export class AppModule {}
