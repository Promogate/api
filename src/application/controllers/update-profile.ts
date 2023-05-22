import { VerifiedTokenRequest } from '@/domain/models';
import { prisma } from '@/main/config';
import { Response } from 'express';

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
class UpdateProfileController {
  async handle(req: VerifiedTokenRequest, res: Response): Promise<Response> {
    const { id } = req.params as { id: string };
    const body = req.body as UpdateProfileBody;
  
    try {
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
        },
        include: {
          social_media: true,
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
  }
}

export const updateProfileController = new UpdateProfileController();