import { UsecaseImplFactory } from "../application/factory";
import { sqliteDataSource } from "../infra/database/datasource";
import { RepositoryImplFactory } from "../infra/factory";
import { ExpressAdapter } from "../infra/http/express-adapter";
import { MainController } from "../infra/http/main-controller";

// main composition root
async function main () {
  const ds = await sqliteDataSource()
  const repositoryFactory = new RepositoryImplFactory(ds);
  const usecaseFactory = new UsecaseImplFactory(repositoryFactory);
  const httpServer = new ExpressAdapter();
  new MainController(httpServer, usecaseFactory);
  httpServer.listen(3000);
}
main();
