import { NestFactory } from '@nestjs/core';
import { ConfigService } from 'src/shared/modules/config/service/config.service';
import { DatabaseModule } from 'src/shared/modules/database.module';
import { TypeormMigrationService } from 'src/shared/modules/database/typeorm/typeorm-migration.service';
import { DataSourceOptions } from 'typeorm';
import { createPostgresDatabase } from 'typeorm-extension';

const createDatabaseModule = async () => {
  return await NestFactory.createApplicationContext(
    DatabaseModule.forRoot({
      migrations: [__dirname + '/migrations/*'],
    }),
  );
};

export const migrate = async () => {
  const migrationModule = await createDatabaseModule();
  migrationModule.init();
  const configService = migrationModule.get<ConfigService>(ConfigService);
  const options = {
    type: 'postgres',
    ...configService.get('database'),
  } as DataSourceOptions;
  await createPostgresDatabase({
    ifNotExist: true,
    options,
  });
  await migrationModule.get(TypeormMigrationService).migrate();
};

export const getDataSource = async () => {
  const migrationModule = await createDatabaseModule();
  return migrationModule.get(TypeormMigrationService).getDataSource();
};
