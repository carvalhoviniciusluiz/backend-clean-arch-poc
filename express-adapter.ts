import express, { Request, Response } from "express";

export interface HttpServer {
  on (method: string, url: string, callback: Function): void;
  listen (port: number): void;
}

export class ExpressAdapter implements HttpServer {
  app: any;

  constructor () {
    this.app = express();
    this.app.use(express.json());
  }

  on(method: string, url: string, callback: Function): void {
    this.app[method](url.replace(/\{|\}/g, ""), async (req: Request, res: Response) => {
      try {
        const output = await callback(req.params, req.body);
        res.json(output);
      } catch (e: any) {
        res.status(422).send(e.message);
      }
    });
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`running on http://localhost:${port}`)
    });
  }
}
