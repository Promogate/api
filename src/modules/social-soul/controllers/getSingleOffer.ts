import { VerifiedTokenRequest } from '@/domain/models';
import { Response } from 'express';
import { ConnectSocialsoulService } from '../services';

class GetSingleOfferController {
  async handle(req: VerifiedTokenRequest, res: Response): Promise<Response> {
    const { offerId } = req.params as { offerId: string};
    const query = req.query as { storeId: string };
    const { 'x-source-id': sourceId } = req.headers as { 'x-source-id': string };
    
    const getSingleOfferService = new ConnectSocialsoulService({ sourceId });
    const result = await getSingleOfferService.getOfferById({ offerId, params: query });

    return res.status(200).json(result);
  }
}

export const getSingleOfferController = new GetSingleOfferController();