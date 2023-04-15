import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindUserByEmailService } from '@/application/services';

class FindUserByEmailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const findUserByEmailService = container.resolve(FindUserByEmailService)
    const result = await findUserByEmailService.execute(req.body)
    return res.status(200).json(result)
  }
}

export const findUserByEmailController = new FindUserByEmailController()