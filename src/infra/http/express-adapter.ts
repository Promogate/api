import { ErrorHandler, HttpStatusCode } from "@/application/utils";
import express, { Request, Response } from "express";
import "express-async-errors";
import { HttpServer } from "./http-server";

export class ExpressAdapter implements HttpServer {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  on(method: string, url: string, middlewares: Function[], callback: Function): void {
    this.app[method](url, [...middlewares], async function (req: Request, res: Response) {
      try {
        const output = await callback({ params: req.params, query: req.query, headers: req.headers }, req.body);
        res.json(output);
      } catch (error: any) {
        throw new ErrorHandler({
          statusCode: HttpStatusCode.BAD_REQUEST,
          name: error.name,
          message: error.message,
        });
      }
    });
  }
  listen(port: number): void {
    this.app.listen(port, () => console.log(`Server is running on port: ${port}`));
  }
}