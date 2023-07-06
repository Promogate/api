import { VerifiedTokenRequest } from '@/domain/models';
import { prisma } from '@/main/config';
import { Response } from 'express';
import { ErrorHandler, HttpStatusCode } from '../utils';

type UpdateProfileBody = {
  name?: string;
  store_image?: string;
  store_name?: string;
  store_name_display?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  telegram?: string;
  twitter?: string;
  lomadeeSourceId?: string;
}

/*eslint-disable @typescript-eslint/no-explicit-any*/
class UpdateProfileController {
  async handle(req: VerifiedTokenRequest, res: Response): Promise<Response> {
    const { id } = req.params as { id: string };
    const body = req.body as UpdateProfileBody;
    const loadedProfileByID = await prisma.userProfile.findUnique({ where: { id: id } })
    if (loadedProfileByID?.store_name === body.store_name) {
      const profile = await prisma.userProfile.update({
        where: {
          id: id
        },
        data: {
          lomadee_source_id: body?.lomadeeSourceId,
          store_name: body?.store_name,
          store_name_display: body?.store_name_display,
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
    }
    if(body.store_name) {
      const findStoreByName = await prisma.userProfile.findUnique({ where: { store_name: body.store_name } });
      if (findStoreByName) {
        throw new ErrorHandler({
          name: 'ProfileAlreadyExists',
          message: 'Identificador único de perfil já está sendo utilizado. Tente outro.',
          statusCode: HttpStatusCode.FORBIDDEN
        })
      }
    }
    const profile = await prisma.userProfile.update({
      where: {
        id: id
      },
      data: {
        lomadee_source_id: body?.lomadeeSourceId,
        store_name: body?.store_name,
        store_name_display: body?.store_name_display,
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
  }
}

export const updateProfileController = new UpdateProfileController();