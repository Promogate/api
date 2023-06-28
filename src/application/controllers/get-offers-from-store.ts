import { GetOffersFromStoreService } from '@/application/services';
import { CacheService } from '@/application/services/Cache';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

/*eslint-disable @typescript-eslint/no-explicit-any*/
class GetOffersFromStoreController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { store } = req.params as { store: string };
    const service = container.resolve(GetOffersFromStoreService)
    const cacheService = container.resolve(CacheService)
    const cached = await cacheService.get({ cacheKey: store+':all:offers'})
    if (!cached) {
      try {
        const result = await service.execute({ storeName: store });
        await cacheService.set({ cacheKey: store+':all:offers', content: result })
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
    return res.status(200).json({
      status: 'success',
      message: 'Ofertas encontradas',
      data: cached
    })
  }
}

export const getOffersFromStoreController = new GetOffersFromStoreController();