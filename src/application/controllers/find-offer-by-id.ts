import { FindOfferByIdService } from "@/application/services";
import { AnalyticsRepository, ResourcesRepository } from "@/data/repositories";
import { Request, Response } from "express";

class FindOfferByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as { id: string };
    const resourcesRepository = new ResourcesRepository();
    const analyticsRepository = new AnalyticsRepository();
    const findOfferByIdService = new FindOfferByIdService(resourcesRepository, analyticsRepository);
    const result = await findOfferByIdService.execute({ id, methods: req.query });
    return res.status(200).json(result);
  }
}

export const findOfferByIdController = new FindOfferByIdController();
