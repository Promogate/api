import { getProfileController } from '@/application/controllers';
import { verifyToken } from '@/application/middlewares';
import { prisma } from '@/main/config';
import { Request, Response, Router } from 'express';

const analyticsRouter = Router();

/*eslint-disable  @typescript-eslint/no-explicit-any*/
analyticsRouter.get('/redirect/offer/:id', async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  try {
    const offer = await prisma.offer.findUnique({
      where: {
        id
      },
      include: {
        resources: {
          include: {
            analytics: {
              select: {
                id: true
              }
            }
          }
        }
      }
    })

    if (!offer) {
      return res.status(404).json({
        status: 'error',
        message: 'Oferta não encontrada'
      })
    }

    await prisma.destinationClicks.create({
      data: {
        resource_id: offer.resources_id,
        destination_link: offer.destination_link,
        offer_id: id,
        analytics_id: offer.resources.analytics?.id as string
      }
    })

    return res.status(200).json({
      status: 'success',
      message: 'Oferta',
      offer
    })
  } catch (error: any) {
    return res.status(400).json({
      status: 'error',
      error: error.message,
      message: 'Algo deu erro ao tentar encontrar a oferta'
    })
  }
});

analyticsRouter.use(verifyToken);
analyticsRouter.get('/profile/:id', getProfileController.handle);

export { analyticsRouter };
