import { getDataSource } from './typeorm-migration-helper';

const prepareDateSourceForMigration = async () => {
  const dataSource = await getDataSource();

  await dataSource.destroy();
  return dataSource;
};

export default prepareDateSourceForMigration();
