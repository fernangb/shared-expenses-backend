import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormUserAuthModel } from 'src/modules/auth/infra/database/typeorm/models/typeorm-user-auth.model';
import { TypeormGroupMemberModel } from 'src/modules/groups/infra/database/typeorm/models/typeorm-group-member.model';
import { TypeormGroupModel } from 'src/modules/groups/infra/database/typeorm/models/typeorm-group.model';
import { TypeormUserModel } from 'src/modules/users/infra/database/typeorm/models/typeorm-user.model';

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
      entities: [
        TypeormGroupModel,
        TypeormGroupMemberModel,
        TypeormUserModel,
        TypeormUserAuthModel,
      ],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
