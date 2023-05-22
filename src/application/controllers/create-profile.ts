import { generateApiKey, generateExpirationDate } from '@/application/utils';
import { VerifiedTokenRequest } from '@/domain/models';
import { prisma } from '@/main/config';
import { Response } from 'express';

/*eslint-disable @typescript-eslint/no-explicit-any*/
class CreateProfileController {
  async handle(req: VerifiedTokenRequest, res: Response): Promise<Response> {
    const input = req.body as { store_image: string, store_name: string };
    const urlReadyStoreName = input.store_name.toLowerCase().replace(/\s/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const realStoreName = input.store_name;

    try {
      const profileAlreadyExists = await prisma.userProfile.findFirst({
        where: {
          store_name: {
            equals: urlReadyStoreName,
            mode: 'insensitive'
          }
        }
      });

      if (profileAlreadyExists) {
        return res.status(400).json({ message: 'Perfil já existe, tente outro nome.' })
      }

      const profile = await prisma.userProfile.create({
        data: {
          store_name: urlReadyStoreName,
          store_name_display: realStoreName,
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
      });

      return res.status(201).json({ message: 'Perfil criado com sucesso!' });

    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export const createProfileController = new CreateProfileController();