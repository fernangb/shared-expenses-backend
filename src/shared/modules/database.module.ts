import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormUserModel } from 'src/apps/customer-service/infra/database/typeorm/models/typeorm-user.model';
import { TypeormGroupMemberModel } from 'src/apps/group-service/infra/database/typeorm/models/typeorm-group-member.model';
import { TypeormGroupModel } from 'src/apps/group-service/infra/database/typeorm/models/typeorm-group.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [TypeormGroupModel, TypeormGroupMemberModel, TypeormUserModel],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
