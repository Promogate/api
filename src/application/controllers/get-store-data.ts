import { GetStoreDataService } from '@/application/services';
import { ResourcesRepository } from '@/data/repositories';
import { Request, Response } from 'express';

class GetStoreDataController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { store } = req.params as { store: string };
    const resourcesRepository = new ResourcesRepository()
    const getStoreDataService = new GetStoreDataService(resourcesRepository)
    const result = await getStoreDataService.execute({ store_name: store })
    return res.status(200).json(result);
  }
}

export const getStoreDataController = new GetStoreDataController();