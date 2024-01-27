import express, { NextFunction, Request, Response, Express, request } from "express";
const asyncErrors = require("express-async-errors");
import cors from "cors";

import { ErrorHandler, HttpStatusCode } from "@/application/utils";
import { HttpServer } from "./http-server";


export class ExpressAdapter implements HttpServer {
  app: Express;

  constructor() {
    asyncErrors;

    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());

    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      res.status(500).send("Something broke!");
      next();
    });
  }

  on(method: string, url: string, middlewares: Function[], callback: (request: Request, body: any) => Promise<any>): void {
    this.app._router[method](url, [...middlewares], async function (req: Request, res: Response) {
      try {
        const output = await callback(req, req.body);
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