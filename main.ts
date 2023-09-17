import { ExpressAdapter } from "./express-adapter";
import { MainController } from "./main-controller";
import { RepositoryFactoryImpl } from "./repository-impl.factory";
import { sqliteDataSource } from "./sqlite.datasource";
import UsecaseFactoryImpl from "./usecase-impl.factory";

// main composition root
async function main () {
  const ds = await sqliteDataSource()
  const repositoryFactory = new RepositoryFactoryImpl(ds);
  const usecaseFactory = new UsecaseFactoryImpl(repositoryFactory);
  const httpServer = new ExpressAdapter();
  new MainController(httpServer, usecaseFactory);
  httpServer.listen(3000);
}
main();
