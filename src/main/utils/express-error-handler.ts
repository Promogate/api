import { NextFunction, Request, Response } from 'express';

export function errorHandler (err: Error, req: Request, res: Response, next: NextFunction) {
  
  next()

  return res.status(500).json({
    name: err.name,
    message: err.message,
  })
}