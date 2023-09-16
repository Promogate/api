import { ApiToken } from "@/domain/models";
import { NextFunction, Request, Response } from "express";

export function verifyAPIKey(req: Request & ApiToken, res: Response, next: NextFunction) {

  if (!req.headers["x-api-key"] || req.headers["x-api-key"] === "") {
    return res.status(401).json({
      message: "API key is missing!"
    });
  }

  req.token = req.headers["x-api-key"] as string;
  next();
}