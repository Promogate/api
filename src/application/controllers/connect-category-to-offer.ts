import { VerifiedTokenRequest } from '@/domain/models';
import { prisma } from '@/main/config';
import { Response } from 'express';

/*eslint-disable @typescript-eslint/no-explicit-any*/
class ConnectCategoryToOfferController {
  async handle (req: VerifiedTokenRequest, res: Response): Promise<Response> {
    const { resourcesId, offerId } = req.params as { resourcesId: string, offerId: string };

    const body = req.body as  { categoryId: string };

    try {
      const offer = await prisma.categoriesOnOffer.create({
        data: {
          resource_id: resourcesId,
          offer_id: offerId,
          category_id: body.categoryId,
        }
      });
  
      return res.status(200).json({
        status: 'success',
        message: 'Categoria adicionada com sucesso à oferta',
        offer
      });
  
    } catch (error: any) {
      return res.status(400).json({
        status: 'error',
        error: error.message,
        message: 'Algo deu errado ao tentar atualizar a oferta'
      })
    }
  }
}

export const connectCategoryToOfferController = new ConnectCategoryToOfferController();