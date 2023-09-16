import { Request, Response } from "express";

import { FindUserByEmailService } from "@/application/services";
import { UserRepository } from "@/data/repositories";

class FindUserByEmailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const userRepository = new UserRepository();
    const findUserByEmailService = new FindUserByEmailService(userRepository);
    const result = await findUserByEmailService.execute(req.body);
    return res.status(200).json(result);
  }
}

export const findUserByEmailController = new FindUserByEmailController();