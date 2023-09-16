import { GetProfileService } from "@/application/services";
import { AnalyticsRepository } from "@/data/repositories";
import { Request, Response } from "express";

class GetProfileController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as { id: string };
    const analyticsRepository = new AnalyticsRepository();
    const getProfileService = new GetProfileService(analyticsRepository);
    const result = await getProfileService.execute({ id });
    return res.status(200).json(result);
  }
}

export const getProfileController = new GetProfileController();