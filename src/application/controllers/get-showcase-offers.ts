import { GetShowcaseOffersService } from '@/application/services';
import { ResourcesRepository } from '@/data/repositories';
import { Request, Response } from 'express';

class GetShowcaseOffersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { store } = req.params as { store: string };
    const resourcesRepository = new ResourcesRepository
    const getShowcaseOffersService = new GetShowcaseOffersService(resourcesRepository)
    const result = await getShowcaseOffersService.execute({ store_name: store });
    return res.status(200).json(result);
  }
}

export const getShowcaseOffersController = new GetShowcaseOffersController();