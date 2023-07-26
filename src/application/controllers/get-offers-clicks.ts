import { GetOffersClicksService } from '@/application/services';
import { AnalyticsRepository, UserRepository } from '@/data/repositories';
import { Request, Response } from 'express';

class GetOffersClicksController {
  async handle(req: Request & { user?: string }, res: Response): Promise<Response> {
    const analyticsRepository = new AnalyticsRepository()
    const userRepository = new UserRepository()
    const getOffersClicksService = new GetOffersClicksService(analyticsRepository, userRepository)
    const result = await getOffersClicksService.execute({ id: req.user as string });
    return res.status(200).json(result);
  }
}

export const getOffersClicksController = new GetOffersClicksController();