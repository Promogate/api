import { CreateProfileService } from '@/application/services/customer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateProfileController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as { id: string };
    const body = req.body as { store_name: string, store_image: string }
    const createProfileService = container.resolve(CreateProfileService);
    const { profile } = await createProfileService.execute({...body, user: id});
    return res.status(201).json({ profile });
  }
}

export const createProfileController = new CreateProfileController();