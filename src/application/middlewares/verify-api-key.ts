import { NextFunction, Request, Response } from 'express';

export function verifyAPIKey (req: Request, res: Response, next: NextFunction) {

  if (!req.headers['x-api-key'] || req.headers['x-api-key'] === '') {
    return res.status(401).json({
      message: 'API key is missing!'
    });
  }

  next()
}