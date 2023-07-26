import { prisma } from '@/main/config';

import { ErrorHandler, generateApiKey, generateExpirationDate, HttpStatusCode, makeUniqueStoreName } from '@/application/utils';
import { CreateProfile } from '@/domain/features';


export class CreateProfileService implements CreateProfile {
  async execute(input: CreateProfile.Input): Promise<CreateProfile.Output> {
    const uniqueStoreName = makeUniqueStoreName(input.storeName);
    try {
      const profileAlreadyExists = await prisma.userProfile.findUnique({
        where: {
          store_name: uniqueStoreName
        }
      });
      if (profileAlreadyExists) {
        throw new ErrorHandler({
          statusCode: HttpStatusCode.BAD_REQUEST,
          name: 'UserProfileAlreadyExists',
          message: `Perfil já existe. (${input.storeNameDisplay} / ${uniqueStoreName})`
        })
      }
      const profile = await prisma.userProfile.create({
        data: {
          store_name: uniqueStoreName as string,
          store_name_display: input.storeNameDisplay,
          store_image: input.storeImage,
          user: {
            connect: {
              id: input.userId,
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
          },
          user: true
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
  
      return {
        profileId: profile.id
      }
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: error.statusCode,
        name: error.name,
        message: error.message
      });
    }
  }
}