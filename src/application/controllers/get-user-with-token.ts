import { FindUserByIdService } from "@/application/services";
import { UserRepository } from "@/data/repositories";
import { Request, Response } from "express";

class GetUserWithTokenController {
  async handle(req: Request & { user?: string }, res: Response): Promise<Response> {
    const userRepository = new UserRepository();
    const findUserByIdService = new FindUserByIdService(userRepository);
    const result = await findUserByIdService.execute({ id: req?.user as string });
    return res.status(200).json(result);
  }
}

export const getUserWithTokenController = new GetUserWithTokenController();