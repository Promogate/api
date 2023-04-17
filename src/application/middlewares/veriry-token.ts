import { TOKEN_SECRET } from '@/main/config';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export function verifyToken (req: Request & { user?: string }, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ code: 'token.invalid', message: 'Token is missing!' })
  }
  
  const [, token] = authorization.split(' ');
  
  if (token === undefined) {
    return res.status(401).json({ code: 'token.invalid', message: 'Token is missing!' })
  }

  try {

    const verified = verify(token, TOKEN_SECRET) as { id: string };
    req.user = verified.id;

    next();
  } catch {
    return res.status(401).json({ code: 'token.invalid', message: 'Token is invalid!' })
  }
}