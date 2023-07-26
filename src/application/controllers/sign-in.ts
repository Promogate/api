import { SignInService } from '@/application/services';
import { AuthenticationRepository } from '@/data/repositories';
import { Request, Response } from 'express';

type SignInBody = {
  email: string;
  password: string;
}

class SignInController {
  async handle(req: Request, res: Response): Promise<Response> {
    const body = req.body as SignInBody;
    const authenticationRepository = new AuthenticationRepository()
    const signInService = new SignInService(authenticationRepository)
    const result = await signInService.execute(body);
    return res.status(200).json(result);
  }
}

export const signInController = new SignInController();