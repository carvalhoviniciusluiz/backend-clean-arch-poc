import { MikroORM } from '@mikro-orm/mongodb';
import { UserSchemaMongo } from '../schema';

export const mongoDataSource = async () => {
  return MikroORM.init({
    entities: [UserSchemaMongo],
    clientUrl: 'mongodb://localhost:27017/develop',
    debug: false
  });
}
