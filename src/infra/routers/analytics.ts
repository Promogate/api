import { getProfileController } from '@/application/controllers';
import { verifyToken } from '@/application/middlewares';
import { prisma } from '@/main/config';
import { Request, Response, Router } from 'express';

const analyticsRouter = Router();

/*eslint-disable  @typescript-eslint/no-explicit-any*/
analyticsRouter.get('/redirect/offer/with-query', async (req: Request, res: Response) => {
  const { shortLink } = req.query as { shortLink: string };

  try {
    const offer = await prisma.offer.findFirst({
      where: {
        short_link: shortLink
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
