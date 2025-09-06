import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/modules/database.module';
import { GroupModule } from './apps/group-service/application/modules/group.module';
import { UserModule } from './apps/customer-service/application/modules/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    GroupModule,
    UserModule,
  ],
})
export class AppModule {}
