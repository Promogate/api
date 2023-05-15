import {
  createSessionController,
  createUserController
} from '@/application/controllers';
import { verifyToken } from '@/application/middlewares';
import { generateApiKey, generateExpirationDate } from '@/application/utils';
import { VerifiedTokenRequest } from '@/domain/models';
import { prisma } from '@/main/config';
import { Response, Router } from 'express';

type UpdateProfileBody = {
  name?: string;
  store_image?: string;
  store_name?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  telegram?: string;
  twitter?: string;
}

/*eslint-disable @typescript-eslint/no-explicit-any*/
const userRouter = Router()

userRouter.post('/signin', createSessionController.handle);
userRouter.post('/signup', createUserController.handle);

userRouter.use(verifyToken);

userRouter.post('/:id/profile/create', async (req: VerifiedTokenRequest, res: Response) => {
  const input = req.body as { store_image: string, store_name: string };
  const store_name = input.store_name.toLowerCase().replace(/\s/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, "")

  try {
    const profileAlreadyExists = await prisma.userProfile.findFirst({
      where: {
        store_name: {
          equals: store_name,
          mode: 'insensitive'
        }
      }
    })

    if (profileAlreadyExists) {
      return res.status(400).json({ message: 'Perfil já existe, tente outro nome.' })
    }

    const profile = await prisma.userProfile.create({
      data: {
        store_name: store_name,
        store_name_display: input.store_name,
        store_image: input.store_image,
        user: {
          connect: {
            id: req.user,
          }
        },
        resources: {
          create: {}
        },
        api_key: {
          create: {
            key: generateApiKey(),
            expiration_date: generateExpirationDate(1, 'year'),
          }
        }
      }, include: {
        resources: {
          select: {
            id: true
          }
        }
      }
    })

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

  } catch (error: any) {
    return res.status(400).json({ message: error.message })
  }
});

userRouter.put('/profile/:id/update', async (req: VerifiedTokenRequest, res: Response) => {
  const { id } = req.params as { id: string };
  const body = req.body as UpdateProfileBody;
  const treatedStoreName = body.store_name?.replace(/[\D]\s/g, '-');

  try {
    const profileAlreadyExists = await prisma.userProfile.findFirst({
      where: {
        store_name: {
          equals: treatedStoreName,
          mode: 'insensitive'
        }
      }
    })

    const myProfile = await prisma.userProfile.findFirst({
      where: {
        user_id: req.user,
      }
    })

    if (profileAlreadyExists && profileAlreadyExists.store_name !== myProfile?.store_name) {
      return res.status(400).json({ message: 'Perfil já existe, tente outro nome.' })
    }

    const profile = await prisma.userProfile.update({
      where: {
        id: id
      },
      data: {
        store_name: body?.store_name,
        store_image: body?.store_image,
        social_media: {
          upsert: {
            create: {
              facebook: body?.facebook,
              instagram: body?.instagram,
              whatsapp: body?.whatsapp,
              telegram: body?.telegram,
              twitter: body?.twitter,
            },
            update: {
              facebook: body?.facebook,
              instagram: body?.instagram,
              whatsapp: body?.whatsapp,
              telegram: body?.telegram,
              twitter: body?.twitter,
            }
          }
        }
      }
    })

    return res.status(200).json({
      status: 'success',
      message: 'Atualizado com sucesso',
      profile
    })
  } catch (error: any) {
    return res.status(400).json({
      status: 'error',
      message: 'Algo deu errado enquanto tentava atualizar a loja'
    })
  }
});

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
