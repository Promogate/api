import { ErrorHandler, HttpStatusCode } from '@/application/utils';
import { VerifiedTokenRequest } from '@/domain/models';
import { ConnectSocialsoulService } from '@/modules/social-soul/services';
import { Response } from 'express';

/*eslint-disable @typescript-eslint/no-explicit-any*/
class GetCouponsController {
  async handle(req: VerifiedTokenRequest, res: Response): Promise<Response> {
    const { 'x-source-id': sourceId } = req.headers as { 'x-source-id': string };

    const getCouponsService = new ConnectSocialsoulService({ sourceId });

    try {
      const result = await getCouponsService.getCoupons();

      return res.status(200).json(result);
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: HttpStatusCode.BAD_REQUEST,
        name: error.name,
        message: error.message
      })
    }
  }
}

export const getCouponsController = new GetCouponsController();