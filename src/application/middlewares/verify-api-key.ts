import { NextFunction, Request, Response } from 'express';

export function verifyAPIKey (req: Request, res: Response, next: NextFunction) {
  const { apiKey } = req.query as { apiKey: string };

  if (!apiKey) {
    return res.status(401).json({
      message: 'API key is missing!'
    })
  }

  next()
}