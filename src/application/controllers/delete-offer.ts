import { VerifiedTokenRequest } from '@/domain/models';
import { prisma } from '@/main/config';
import { Response } from 'express';

/*eslint-disable @typescript-eslint/no-explicit-any*/
class DeleteOfferController {
  async handle(req: VerifiedTokenRequest, res: Response): Promise<Response> {
    const { id } = req.params as { id: string };

    try {
      await prisma.offer.delete({
        where: {
          id: id
        }
      })
  
      return res.status(200).json({
        status: 'success',
        message: 'Oferta excluída com sucesso.'
      })
  
    } catch (error: any) {
      return res.status(400).json({
        status: 'error',
        error: error.message,
        message: 'Algo deu erro ao tentar excluir uma nova oferta'
      })
    }
  }
}

export const deleteOfferController = new DeleteOfferController();