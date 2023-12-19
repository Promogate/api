const asyncErrors = require("express-async-errors");

import { ErrorHandler, HttpStatusCode } from "@/application/utils";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { HttpServer } from "./http-server";

export class ExpressAdapter implements HttpServer {
  app: any;

  constructor() {
    asyncErrors;
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      res.status(500).send("Something broke!");
    });
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