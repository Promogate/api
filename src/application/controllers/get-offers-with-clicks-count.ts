import { GetOffersWithClicksCountService } from '@/application/services';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class GetOffersWithClicksCountController {
  async handle(req: Request & { user?: string }, res: Response): Promise<Response> {
    const getOffersWithClicksCountService = container.resolve(GetOffersWithClicksCountService)
    const result = await getOffersWithClicksCountService.execute({ user_id: req.user as string})
    return res.status(200).json(result)
  }
}

export const getOffersWithClicksCountController = new GetOffersWithClicksCountController();