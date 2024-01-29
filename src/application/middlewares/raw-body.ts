import { NextFunction, Request, Response} from "express";

export const rawBody = (req: Request & { rawBody: any }, res: Response, next: NextFunction) => {
  req["rawBody"] = "";

  req.on("data", (chunk: any) => {
    req["rawBody"] += chunk;
  });

  req.on("end", () => {
    next();
  });
};