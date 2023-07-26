import { UpdateOfferService } from '@/application/services';
import { UpdateOfferParams } from '@/domain/@types';
import { VerifiedTokenRequest } from '@/domain/models';
import { Response } from 'express';

type UrlParams = {
  resourceId: string;
  offerId: string;
}

class UpdateOfferController {
  async handle(req: VerifiedTokenRequest, res: Response): Promise<Response> {
    const { offerId } = req.params as UrlParams
    const body = req.body as UpdateOfferParams;
    const service = new UpdateOfferService()
    const result = await service.execute({
      offerId,
      image: body.image,
      title: body.title,
      oldPrice: body.old_price,
      price: body.price,
      destinationLink: body.destination_link,
      storeName: body.store_name,
      expirationDate: body.expiration_date,
      description: body.description,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Oferta atualizada com sucesso!',
      data: result
    })
  }
}

export const updateOfferController = new UpdateOfferController();