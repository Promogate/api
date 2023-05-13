import {
  AddOfferClickRepository, IGetProfileRepository
} from '@/data/contracts';
import { prisma } from '@/main/config';

/*eslint-disable @typescript-eslint/no-explicit-any*/
export class AnalyticsRepository implements
  AddOfferClickRepository,
  IGetProfileRepository {

  async getProfile(input: IGetProfileRepository.Input): Promise<IGetProfileRepository.Ouput> {
    const profile = await prisma.userProfile.findFirst({
      where: {
        id: input.id
      }, select: {
        id: true,
        store_name: true,
        store_image: true,
        api_key: true,
        role: true,
        user_id: true,
        analytics: {
          select: {
            _count: {
              select: {
                offer_clicks: true,
                destination_clicks: true,
              },
            },
          },
        },
        resources: {
          select: {
            offers: {
              take: 10,
              include: {
                _count: {
                  select: {
                    offer_clicks: true
                  }
                },
              },
              orderBy: {
                offer_clicks: {
                  _count: 'desc'
                }
              }
            }
          }
        },
      },
    })

    if (!profile) {
      throw new Error('Não foi possível encontrar o perfil.')
    }

    return profile
  }
    
  async addClick(input: AddOfferClickRepository.Input): Promise<void> {
    try {
      const offer = await prisma.offer.findFirstOrThrow({
        where: {
          id: input.id
        }, include: {
          resources: {
            include: {
              analytics: {
                select: {
                  id: true,
                  resources_id: true
                }
              }
            }
          }
        }
      })

      await prisma.offerClicks.create({
        data: {
          offer_id: offer.id,
          analytics_id: offer.resources.analytics?.id as string
        }
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}