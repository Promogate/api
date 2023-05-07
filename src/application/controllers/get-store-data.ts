import { GetStoreDataService } from '@/application/services';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class GetStoreDataController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { store } = req.params as { store: string };
    const getStoreDataService = container.resolve(GetStoreDataService);
    const result = await getStoreDataService.execute({ store_name: store })
    return res.status(200).json(result);
  }
}

export const getStoreDataController = new GetStoreDataController();