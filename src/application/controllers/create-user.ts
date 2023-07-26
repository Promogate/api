import { CreateUserService } from '@/application/services';
import { AuthenticationRepository } from '@/data/repositories';
import { CreateUser } from '@/domain/features';
import { Request, Response } from 'express';

class CreateUserController {
  constructor (private readonly createUserUseCase: CreateUser) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const result = await this.createUserUseCase.execute(req.body);
    return res.status(201).json(result)
  }
}

const userRepository = new AuthenticationRepository()
const createUserUseCase = new CreateUserService(userRepository)
export const createUserController = new CreateUserController(createUserUseCase)