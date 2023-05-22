import {
  createProfileController,
  createSessionController,
  createUserController,
  updateProfileController
} from '@/application/controllers';
import { verifyToken } from '@/application/middlewares';
import { VerifiedTokenRequest } from '@/domain/models';
import { prisma } from '@/main/config';
import { Response, Router } from 'express';



/*eslint-disable @typescript-eslint/no-explicit-any*/
const userRouter = Router()

userRouter.post('/signin', createSessionController.handle);

userRouter.post('/signup', createUserController.handle);

userRouter.use(verifyToken);

userRouter.post('/:id/profile/create', createProfileController.handle);

userRouter.put('/profile/:id/update', updateProfileController.handle);

userRouter.get('/me', async (req: VerifiedTokenRequest, res: Response) => {
  try {
    const userId = req.user;

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }, select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        user_profile: {
          include: {
            resources: true,
            social_media: {
              select: {
                facebook: true,
                instagram: true,
                telegram: true,
                twitter: true,
                whatsapp: true,
              }
            },
          },
        }
      }
    });

    if (!user) {
      return res.status(401).json({ message: 'User not found!' })
    }

    return res.status(200).json({
      status: 'success',
      user
    });
  } catch {
    return res.status(401).json({ message: 'Token is missing' })
  }
});

userRouter.get('/me/categories', async (req: VerifiedTokenRequest, res: Response) => {
  try {

    const user = await prisma.user.findUnique({
      where: {
        id: req.user
      }, select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        user_profile: {
          include: {
            resources: {
              select: {
                categories: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      return res.status(401).json({
        status: 'error',
        error: 'Não autorizado',
        message: 'Error ao buscar informações sobre o usuário'
      });
    }

    return res.status(200).json({
      status: 'sucess',
      message: 'Usuário encontrado',
      user
    });
  } catch (error: any) {
    return res.status(400).json({
      status: 'error',
      error: error.message,
      message: 'Error ao buscar informações sobre o usuário'
    });
  }
});

export { userRouter };
