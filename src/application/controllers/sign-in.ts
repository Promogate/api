import { SignInService } from '@/application/services';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

type SignInBody = {
  email: string;
  password: string;
}

class SignInController {
  async handle(req: Request, res: Response): Promise<Response> {
    const body = req.body as SignInBody;
    const signInService = container.resolve(SignInService);
    const result = await signInService.execute(body);
    return res.status(200).json(result);
  }
}

export const signInController = new SignInController();