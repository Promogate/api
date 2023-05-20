import { VerifiedTokenRequest } from '@/domain/models';
import { prisma } from '@/main/config';
import { Response } from 'express';

/*eslint-disable @typescript-eslint/no-explicit-any*/
class UpdateFeaturedOfferStatusController {
  async handle(req: VerifiedTokenRequest, res: Response): Promise<Response> {
    const { offerId } = req.params as { offerId: string };
    const body = req.body as { is_featured: boolean };

    try {
      const offer = await prisma.offer.update({
        where: {
          id: offerId,
        }, data: {
          is_featured: body.is_featured
        }
      })
  
      return res.status(200).json({
        status: 'success',
        message: 'Oferta atualizada com sucesso com sucesso!',
        offer
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