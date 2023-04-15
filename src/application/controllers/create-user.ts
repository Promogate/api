import { CreateUserService } from '@/application/services';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(CreateUserService);
    const result = await service.execute(req.body);
    return res.status(201).json(result)
  }
}

export const createUserController = new CreateUserController()