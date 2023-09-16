import { SignInService } from "@/application/services";
import { AuthenticationRepository } from "@/data/repositories";
import { Request, Response } from "express";

class SignInController {
  async handle(req: Request, res: Response): Promise<Response> {
    const body = req.body as Input;
    const authenticationRepository = new AuthenticationRepository();
    const signInService = new SignInService(authenticationRepository);
    const result = await signInService.execute(body);
    return res.status(200).json(result);
  }
}

type Input = {
  email: string;
  password: string;
}


export const signInController = new SignInController();