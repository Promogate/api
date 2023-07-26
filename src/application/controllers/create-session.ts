import { SignInService } from '@/application/services/';
import { AuthenticationRepository } from '@/data/repositories';
import { Request, Response } from 'express';

class CreateSessionController {
  async handle (req: Request, res: Response): Promise<Response> {
    const authenticationRepo = new AuthenticationRepository()
    const createSessionService = new SignInService(authenticationRepo)
    const result = await createSessionService.execute(req.body);
    return res.status(200).json(result)
  }
}

export const createSessionController = new CreateSessionController()