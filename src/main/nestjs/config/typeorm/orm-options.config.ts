import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

type OrmOptions = {
  development?: SqliteConnectionOptions;
};

const ormOptions: OrmOptions = {
  development: {
    type: 'sqlite',
    database: 'database.sqlite'
  }
};

export default ormOptions[process.env.NODE_ENV ?? 'development'];
