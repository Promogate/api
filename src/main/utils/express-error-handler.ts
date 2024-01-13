import { ErrorHandler } from "@/application/utils";
import { NextFunction, Request, Response } from "express";

export function errorHandler (error: ErrorHandler, req: Request, res: Response, next: NextFunction) {
  const errorStatus = error.statusCode || 500;
  const message = error.message || "Error interno do servidor";
  const name = error.name || "ServerError";
  
  if (res.headersSent) {
    return next(error);
  }
  
  return res.status(errorStatus).json({
    name: name,
    message: message,
  });
  
}