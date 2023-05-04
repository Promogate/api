import { Request, Response } from 'express';

class GetUserWithTokenController {
  async handle(req: Request & { user?: string }, res: Response): Promise<Response> {
    return res.status(200).json({ user: req?.user })
  }
}

export const getUserWithTokenController = new GetUserWithTokenController();