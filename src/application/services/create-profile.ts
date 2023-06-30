import { CreateProfileInput } from '@/domain/@types';
import { prisma } from '@/main/config';

import { ErrorHandler, generateApiKey, generateExpirationDate, HttpStatusCode } from '@/application/utils';
import { UserProfile } from '@prisma/client';
import { injectable } from 'tsyringe';

type Output = UserProfile & {
  resources: {
      id: string;
  } | null;
}

@injectable()
/*eslint-disable @typescript-eslint/no-explicit-any*/
export class CreateProfileService {
  async execute(input: CreateProfileInput): Promise<Output> {
    const uniqueStoreName = input.storeName.toLowerCase().trim().replace(/[\s]/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const realStoreName = input.storeName;

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
          message: `Perfil já existe. (${realStoreName} / ${uniqueStoreName})`
        })
      }
  
      const profile = await prisma.userProfile.create({
        data: {
          store_name: uniqueStoreName,
          store_name_display: realStoreName,
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
  
      return profile
      
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: error.statusCode,
        name: error.name,
        message: error.message
      });
    }
  }
}