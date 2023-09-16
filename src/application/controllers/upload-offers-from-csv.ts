import { UploadOffersFromCSVService } from "@/application/services";
import { ResourcesRepository, UserRepository } from "@/data/repositories";
import { Request, Response } from "express";

class UploadOffersFromCSVConstroller {
  async handle(req: Request & { user?: string }, res: Response): Promise<Response> {
    const { file } = req;
    const resourcesRepository = new ResourcesRepository();
    const userRepository = new UserRepository();
    const uploadOffersFromCSVService = new UploadOffersFromCSVService(resourcesRepository, userRepository);

    const { json } = await uploadOffersFromCSVService.execute({ 
      file: file as Express.Multer.File,
      user_id: req.user as string
    });
    
    return res.status(200).json(json);
  }
}

export const uploadOffersFromCSVConstroller = new UploadOffersFromCSVConstroller();