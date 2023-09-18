import { UsecaseImplFactory } from "~/application/factory";
import { sqliteDataSource } from "~/infra/database/typeorm/datasource";
import { RepositoryImplFactory } from "~/infra/factory";
import { ExpressAdapter, HapiAdapter, MainController } from "~/infra/http";

// main composition root
async function main () {
  const ds = await sqliteDataSource()
  const repositoryFactory = new RepositoryImplFactory(ds);
  const usecaseFactory = new UsecaseImplFactory(repositoryFactory);
  // const httpServer = new ExpressAdapter();
  const httpServer = new HapiAdapter();
  new MainController(httpServer, usecaseFactory);
  httpServer.listen(3000);
}
main();
