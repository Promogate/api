import { UpdateFeaturedOfferStatusService } from '@/application/services';
import { VerifiedTokenRequest } from '@/domain/models';
import { Response } from 'express';
import { container } from 'tsyringe';

/*eslint-disable @typescript-eslint/no-explicit-any*/
class UpdateFeaturedOfferStatusController {
  async handle(req: VerifiedTokenRequest, res: Response): Promise<Response> {
    const { offerId } = req.params as { offerId: string };
    const body = req.body as { is_featured: boolean };

    try {
      const updateFeaturedOfferStatusService = container.resolve(UpdateFeaturedOfferStatusService)
      const result = await updateFeaturedOfferStatusService.execute({
        is_featured: body.is_featured,
        offer_id: offerId,
        user_id: req.user as string,
        role: req.role as string
      })

      return res.status(200).json({
        status: 'success',
        message: 'Oferta atualizada com sucesso com sucesso!',
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

export const updateFeaturedOfferStatusController = new UpdateFeaturedOfferStatusController();