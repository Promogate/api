import { UpdateShowcaseOfferStatusService } from '@/application/services';
import { VerifiedTokenRequest } from '@/domain/models';
import { Response } from 'express';
import { container } from 'tsyringe';
import { HttpStatusCode } from '../utils';

/*eslint-disable @typescript-eslint/no-explicit-any*/
class UpdateShowcaseOfferStatusController {
  async handle(req: VerifiedTokenRequest, res: Response): Promise<Response> {
    const { offerId } = req.params as { offerId: string };
    const body = req.body as { is_on_showcase: boolean };

    try {
      const userId = req.user as string;
      const updateShowcaseOfferStatusService = container.resolve(UpdateShowcaseOfferStatusService)
      const result = await updateShowcaseOfferStatusService.execute({
        is_on_showcase: body.is_on_showcase,
        offer_id: offerId,
        user_id: userId
      })

      return res.status(HttpStatusCode.OK).json({
        status: 'success',
        message: 'Oferta atualizada com sucesso!',
        offer: result
      })
    } catch (error: any) {
      return res.status(400).json({
        status: 'error',
        error: error.message,
        message: 'Algo deu erro ao tentar atualizar a oferta'
      })
    }
  }
}

export const updateShowcaseOfferStatusController = new UpdateShowcaseOfferStatusController();