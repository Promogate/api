import { FindUserByIdService } from '@/application/services';
import { UserRepository } from '@/data/repositories';
import { Request, Response } from 'express';

class FindUserByIdController {
  async handle(req: Request & { user?: string }, res: Response): Promise<Response> {
    const userRepository = new UserRepository()
    const findUserByIdService = new FindUserByIdService(userRepository)
    const result = await findUserByIdService.execute(req.query as  { id: string })
    return res.status(200).json(result)
  }
}

export const findUserByIdController = new FindUserByIdController()