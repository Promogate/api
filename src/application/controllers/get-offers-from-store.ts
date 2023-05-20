import { prisma } from '@/main/config';
import { Request, Response } from 'express';

/*eslint-disable @typescript-eslint/no-explicit-any*/
class GetOffersFromStoreController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { store } = req.params as { store: string };

    try {
      const user_profile = await prisma.userProfile.findFirst({
        where: {
          store_name: {
            equals: store,
            mode: 'insensitive',
          }
        }, include: {
          resources: {
            select: {
              offers: {
                take: 50,
                where: {
                  is_on_showcase: {
                    equals: true,
                  }
                }, include: {
                  _count: {
                    select: {
                      offer_clicks: true
                    }
                  }
                }
              }
            }
          }
        }
      })
  
      return res.status(200).json({
        status: 'success',
        message: 'Ofertas encontradas',
        user_profile
      })
    } catch (error: any) {
      return res.status(400).json({
        status: 'error',
        error: error.message,
        message: 'Algo deu erro ao tentar criar uma nova oferta'
      })
    }
  }
}

export const getOffersFromStoreController = new GetOffersFromStoreController();