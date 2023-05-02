import { Request, Response } from 'express';

class GetUserWithTokenController {
  async handle(req: Request & { user?: string }, res: Response): Promise<Response> {
    const id = req.user;
    return res.status(200).json({ user: id })
  }
}

export const getUserWithTokenController = new GetUserWithTokenController();