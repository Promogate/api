import {
  createSessionController,
  createUserController
} from '@/application/controllers';
import { verifyToken } from '@/application/middlewares';
import { generateApiKey, generateExpirationDate } from '@/application/utils';
import { prisma } from '@/main/config';
import { Request, Response, Router } from 'express';

const userRouter = Router()

userRouter.post('/signin', createSessionController.handle);
userRouter.post('/signup', createUserController.handle);

userRouter.post('/:id/profile/create', async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const input = req.body as { store_image: string, store_name: string };
  
  try {
    const profileAlreadyExists = await prisma.userProfile.findUnique({
      where: {
        store_name: input.store_name
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

userRouter.get('/me', verifyToken, async (req: Request & { user?: string }, res: Response) => {
  try {
    const userId = req.user;

    const data = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!data) {
      return res.status(401).json({ message: 'User not found!' })
    }

    return res.status(200).json({ 
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        created_at: data.created_at
      }
    });
  } catch {
    return res.status(401).json({ message: 'Token is missing' })
  }
});

export { userRouter };
