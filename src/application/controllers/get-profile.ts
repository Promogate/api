import { GetProfileService } from '@/application/services';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class GetProfileController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as { id: string }
    const getProfileService = container.resolve(GetProfileService);
    const result = await getProfileService.execute({ id });
    return res.status(200).json(result)
  }
}

export const getProfileController = new GetProfileController();