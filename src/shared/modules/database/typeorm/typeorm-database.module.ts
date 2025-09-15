import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormBaseModel } from './typeorm-base.entity';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/service/config.service';
import { TypeormMigrationService } from './typeorm-migration.service';

@Module({})
export class TypeormDatabaseModule {
  static forRoot(options: {
    migrations?: string[];
    entities?: Array<typeof TypeormBaseModel>;
  }): DynamicModule {
    return {
      module: TypeormDatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule.forRoot()],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
            return {
              type: 'postgres',
              logging: false,
              autoLoadEntities: false,
              synchronize: false,
              migrationsTableName: 'typeorm_migrations',
              ...configService.get('database'),
              ...options,
            };
          },
        }),
      ],
      providers: [TypeormMigrationService],
      exports: [TypeormMigrationService],
    };
  }
}
