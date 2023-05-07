import { GetShowcaseOffersService } from '@/application/services';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class GetShowcaseOffersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { store } = req.params as { store: string };
    const getShowcaseOffersService = container.resolve(GetShowcaseOffersService);
    const result = await getShowcaseOffersService.execute({ store_name: store });
    return res.status(200).json(result);
  }
}

export const getShowcaseOffersController = new GetShowcaseOffersController();