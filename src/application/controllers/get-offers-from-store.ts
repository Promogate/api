import { GetOffersFromStoreService } from '@/application/services';
import { redis } from '@/infra/lib';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

/*eslint-disable @typescript-eslint/no-explicit-any*/
class GetOffersFromStoreController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { store } = req.params as { store: string };
    const service = container.resolve(GetOffersFromStoreService)
    try {
      console.time(`Execution time - ${store}`);
      const cacheKey = store+':all';
      const cachedOffers = await redis.get(cacheKey);
      if (cachedOffers) {
        console.timeEnd(`Execution time - ${store}`);
        return res.status(200).json({
          status: 'success',
          message: 'Ofertas encontradas',
          data: JSON.parse(cachedOffers)
        })
      }
      const result = await service.execute({ storeName: store });
      console.timeEnd(`Execution time - ${store}`);
      await redis.set(cacheKey, JSON.stringify(result), 'EX', 2678400)
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