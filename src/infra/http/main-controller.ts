import { UsecaseFactory } from "~/domain/usecase";
import { HttpServer } from "./http-server.interface";


// Interface Adapter
export class MainController {
  constructor (httpServer: HttpServer, usecaseFactory: UsecaseFactory) {
    httpServer.on("post", "/signup", async (params: any, body: any) => {
      const output = await usecaseFactory.createSignUp().execute(body);
      return output;
    });
  }
}
