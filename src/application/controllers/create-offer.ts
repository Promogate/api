import { CreateOfferService } from '@/application/services';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateOfferController {
  async handle (req: Request, res: Response): Promise<Response> {
    const createOfferService = container.resolve(CreateOfferService)
    await createOfferService.execute({ 
      ...req.body, 
      apiKey: req.headers['x-api-key'] as string 
    });
    return res.status(201).send()
  }
}

export const createOfferController = new CreateOfferController()