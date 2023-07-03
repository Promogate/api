import { VerifiedTokenRequest } from '@/domain/models';
import { prisma } from '@/main/config';
import { Response } from 'express';
import { ErrorHandler, HttpStatusCode, makeUniqueStoreName } from '../utils';

type UpdateProfileBody = {
  name?: string;
  store_image?: string;
  store_name?: string;
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
    if (body.store_name) {
      const uniqueStoreName = makeUniqueStoreName(body.store_name);
      const profileAlreadyExists = await prisma.userProfile.findUnique({
        where: {
          store_name: uniqueStoreName
        }
      });
      if (profileAlreadyExists) {
        throw new ErrorHandler({
          statusCode: HttpStatusCode.BAD_REQUEST,
          name: 'UserProfileAlreadyExists',
          message: `Perfil já existe (${body.store_name} / ${uniqueStoreName}). Tente outro.`
        })
      }

      try {
        const profile = await prisma.userProfile.update({
          where: {
            id: id
          },
          data: {
            lomadee_source_id: body?.lomadeeSourceId,
            store_name: uniqueStoreName,
            store_name_display: body?.store_name,
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
        throw new ErrorHandler({
          statusCode: HttpStatusCode.BAD_REQUEST,
          name: 'UserProfileAlreadyExists',
          message: `Erro ao tentar atualizar o perfil`
        })
      }
    }
    try {
      const profile = await prisma.userProfile.update({
        where: {
          id: id
        },
        data: {
          lomadee_source_id: body?.lomadeeSourceId,
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
      throw new ErrorHandler({
        statusCode: HttpStatusCode.BAD_REQUEST,
        name: 'UserProfileAlreadyExists',
        message: `Erro ao tentar atualizar o perfil`
      })
    }
  }
}

export const updateProfileController = new UpdateProfileController();