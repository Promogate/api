import { GetOffersClicksService } from '@/application/services';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class GetOffersClicksController {
  async handle(req: Request & { user?: string }, res: Response): Promise<Response> {
    const getOffersClicksService = container.resolve(GetOffersClicksService);
    const result = await getOffersClicksService.execute({ id: req.user as string });
    return res.status(200).json(result);
  }
}

export const getOffersClicksController = new GetOffersClicksController();