import { ListOffersService } from '@/application/services';
import { ApiToken } from '@/domain/models';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListOffersController {
  async handle (req: Request & ApiToken, res: Response): Promise<Response> {
    const listOffersService = container.resolve(ListOffersService);
    const result = await listOffersService.execute({ api_key: req.token as string });
    return res.status(200).json(result);
  }
}

export const listOffersController = new ListOffersController();