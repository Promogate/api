import { ListOffersService } from '@/application/services';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListOffersController {
  async handle (req: Request, res: Response): Promise<Response> {
    const listOffersService = container.resolve(ListOffersService);
    const apiKey = req.headers['x-api-key'] as string;
    const result = await listOffersService.execute({ apiKey });
    return res.status(200).json(result);
  }
}

export const listOffersController = new ListOffersController();