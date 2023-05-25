import { ListOffersService } from '@/application/services';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

type ListOffersQueryParams = {
  page?: number;
  perPage?: number;
}

class ListOffersController {
  async handle (req: Request & { user?: string }, res: Response): Promise<Response> {
    const { page, perPage } = req.query as ListOffersQueryParams

    const listOffersService = container.resolve(ListOffersService);

    const result = await listOffersService.execute({ 
      user_id: req.user as string,
      page,
      perPage
     });

    return res.status(200).json(result);
  }
}

export const listOffersController = new ListOffersController();