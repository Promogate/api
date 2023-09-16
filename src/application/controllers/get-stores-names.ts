import { prisma } from '@/main/config';
import { Request, Response } from 'express';

class GetStoresNamesController {
  async handle (req: Request, res: Response): Promise<Response> {
    const stores = await prisma.userProfile.findMany({
      select: {
        store_name: true,
      }
    })

    return res.status(200).json(stores);
  }
}

export const getStoresNamesController = new GetStoresNamesController();