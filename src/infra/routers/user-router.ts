import {
  createSessionController,
  createUserController
} from '@/application/controllers';
import { verifyToken } from '@/application/middlewares';
import { generateApiKey, generateExpirationDate } from '@/application/utils';
import { VerifiedTokenRequest } from '@/domain/models';
import { prisma } from '@/main/config';
import { Request, Response, Router } from 'express';


/*eslint-disable @typescript-eslint/no-explicit-any*/

const userRouter = Router()

userRouter.post('/signin', createSessionController.handle);
userRouter.post('/signup', createUserController.handle);

userRouter.post('/:id/profile/create', async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const input = req.body as { store_image: string, store_name: string };
  const treatedStoreName= input.store_name.toLocaleUpperCase().replace(' ', '-');
  
  try {
    const profileAlreadyExists = await prisma.userProfile.findUnique({
      where: {
        store_name: treatedStoreName
      }
    })

    if (profileAlreadyExists) {
      return res.status(400).json({ message: 'Perfil já existe, tente outro nome.' })
    }

    const profile = await prisma.userProfile.create({
      data: {
        store_image: input.store_image,
        store_name: input.store_name,
        resources: {
          create: {}
        },
        api_key: {
          create: {
            key: generateApiKey(),
            expiration_date: generateExpirationDate(1, 'year'),
          }
        },
        user: {
          connect: {
            id: id,
          }
        },
      }, include: {
        resources: true,
        api_key: true
      }
    });

    await prisma.analytics.create({
      data: {
        user_profile: {
          connect: {
            id: profile.id
          }
        },
        resources: {
          connect: {
            id: profile.resources?.id
          }
        }
      }
    })

    return res.status(201).json({ message: 'Perfil criado com sucesso!' })

  } catch {
    return res.status(400).json({ message: 'Falha ao criar o perfil da loja' })
  }
});

userRouter.use(verifyToken);

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
        user_profile: true
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
