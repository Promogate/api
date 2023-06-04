import { VerifiedTokenRequest } from '@/domain/models';
import { ConnectSocialsoulService } from '@/modules/social-soul/services';
import { Response } from 'express';

class GetStoresController { 
  async handle(req: VerifiedTokenRequest, res: Response): Promise<Response> {
    const { 'x-source-id': sourceId } = req.headers as { 'x-source-id': string };

    const getStoresService = new ConnectSocialsoulService({ sourceId });
    const result = await getStoresService.getStores();
    return res.status(200).json(result);
  }
}

export const getStoresController = new GetStoresController();