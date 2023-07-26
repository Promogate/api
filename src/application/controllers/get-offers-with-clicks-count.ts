import { GetOffersWithClicksCountService } from '@/application/services';
import { AnalyticsRepository } from '@/data/repositories';
import { Request, Response } from 'express';

class GetOffersWithClicksCountController {
  async handle(req: Request & { user?: string }, res: Response): Promise<Response> {
    const analyticsRepository = new AnalyticsRepository()
    const getOffersWithClicksCountService = new GetOffersWithClicksCountService(analyticsRepository)
    const result = await getOffersWithClicksCountService.execute({ user_id: req.user as string})
    return res.status(200).json(result)
  }
}

export const getOffersWithClicksCountController = new GetOffersWithClicksCountController();