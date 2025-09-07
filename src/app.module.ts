import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/modules/database.module';
import { GroupModule } from './modules/groups/infra/http/group.module';
import { UserModule } from './modules/customers/infra/http/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    GroupModule,
    UserModule,
  ],
})
export class AppModule {}
