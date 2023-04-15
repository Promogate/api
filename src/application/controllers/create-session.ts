import { CreateSessionService } from '@/application/services/';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateSessionController {
  async handle (req: Request, res: Response): Promise<Response> {
    const createSessionService = container.resolve(CreateSessionService);
    const result = await createSessionService.execute(req.body);
    return res.status(200).json(result)
  }
}

export const createSessionController = new CreateSessionController()