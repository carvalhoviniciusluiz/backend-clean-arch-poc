import Hapi from "@hapi/hapi";
import { HttpServer } from "./http-server.interface";

export class HapiAdapter implements HttpServer {
  server: Hapi.Server;

  constructor () {
    this.server = Hapi.server({});
  }

  convertUrl (url: string) {
      return url.replace(/\$/g, "");
  }

  async on(method: string, url: string, fn: any): Promise<void> {
    this.server.route({
      method,
      path: this.convertUrl(url),
      handler: async (request: any, reply: any) => {
        try {
          const data = await fn(request.params, request.payload);
          return data;
        } catch (error: any) {
          return reply.response({
            message: error.message
          }).code(422);
        }
      }
    });
  }

  async listen(port: number): Promise<void> {
    this.server.settings.port = port;
    await this.server.start();
    console.log(`running on http://localhost:${port}`);
  }
}
