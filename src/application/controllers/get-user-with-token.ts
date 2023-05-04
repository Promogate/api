import { FindUserByIdService } from '@/application/services';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class GetUserWithTokenController {
  async handle(req: Request & { user?: string }, res: Response): Promise<Response> {
    const findUserByIdService = container.resolve(FindUserByIdService)
    const result = await findUserByIdService.execute({ id: req?.user as string })
    return res.status(200).json(result)
  }
}

export const getUserWithTokenController = new GetUserWithTokenController();