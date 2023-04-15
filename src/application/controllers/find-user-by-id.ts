import { FindUserByIdService } from '@/application/services';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class FindUserByIdController {
  async handle(req: Request, res: Response): Promise<Response> {

    const findUserByIdService = container.resolve(FindUserByIdService)
    const result = await findUserByIdService.execute(req.query as  { id: string })
    return res.status(200).json(result)
  }
}

export const findUserByIdController = new FindUserByIdController()