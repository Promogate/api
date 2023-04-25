import { FindOfferByIdService } from '@/application/services';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class FindOfferByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as { id: string };
    console.log(req.query)
    const findOfferByIdService = container.resolve(FindOfferByIdService);
    const result = await findOfferByIdService.execute({ id, methods: req.query });
    return res.status(200).json(result);
  }
}

export const findOfferByIdController = new FindOfferByIdController();
