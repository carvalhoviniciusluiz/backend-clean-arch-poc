import path from "path";
import { DataSource } from "typeorm";
import { UserSchema } from "../typeorm/schema";

export const sqliteDataSource = () => {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: path.join(__dirname, 'database.sqlite'),
    synchronize: true,
    logging: false,
    entities: [UserSchema]
  });
  return dataSource.initialize();
}
