import { HttpServer } from "./express-adapter";
import { UsecaseFactory } from "./usecase-impl.factory";

// Interface Adapter
export class MainController {
  constructor (httpServer: HttpServer, usecaseFactory: UsecaseFactory) {
    httpServer.on("post", "/signup", async function (params: any, body: any) {
      const output = await usecaseFactory.createSignUp().execute(body);
      return output;
    });
  }
}
