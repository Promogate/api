import { GetOffersFromStoreService } from '@/application/services';
import { Request, Response } from 'express';

/*eslint-disable @typescript-eslint/no-explicit-any*/
class GetOffersFromStoreController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { store } = req.params as { store: string };
    const service = new GetOffersFromStoreService()
    try {
      const result = await service.execute({ storeName: store });
      return res.status(200).json({
        status: 'success',
        message: 'Ofertas encontradas',
        data: result
      })
    } catch (error: any) {
      return res.status(400).json({
        status: 'error',
        error: error.message,
        message: 'Algo deu erro ao tentar buscar as ofertas'
      })
    }
  }
}

export const getOffersFromStoreController = new GetOffersFromStoreController();