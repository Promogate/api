import { ListOffersService } from '@/application/services';
import { ResourcesRepository } from '@/data/repositories';
import { Request, Response } from 'express';

type ListOffersQueryParams = {
  page?: number;
  perPage?: number;
}

class ListOffersController {
  async handle (req: Request & { user?: string }, res: Response): Promise<Response> {
    const { page, perPage } = req.query as ListOffersQueryParams
    const resourcesRepository = new ResourcesRepository()
    const listOffersService = new ListOffersService(resourcesRepository)

    const result = await listOffersService.execute({ 
      user_id: req.user as string,
      page,
      perPage
     });

    return res.status(200).json(result);
  }
}

export const listOffersController = new ListOffersController();