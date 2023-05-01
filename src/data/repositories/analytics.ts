import {
  AddOfferClickRepository,
  GetOffersClicksRepository,
  GetOffersWithClicksCountRepo
} from '@/data/contracts';
import { prisma } from '@/main/config';

/*eslint-disable @typescript-eslint/no-explicit-any*/
export class AnalyticsRepository implements
  AddOfferClickRepository,
  GetOffersClicksRepository,
  GetOffersWithClicksCountRepo {
  async addClick(input: AddOfferClickRepository.Input): Promise<void> {
    try {
      const offer = await prisma.offer.findFirstOrThrow({
        where: {
          id: input.id
        }, include: {
          Resources: {
            include: {
              resources_analytics: {
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
          resource_id: offer.Resources.id,
          offer_id: offer.id,
          resources_analytics_id: offer.Resources.resources_analytics?.id as string
        }
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getClicks(input: GetOffersClicksRepository.Input): Promise<GetOffersClicksRepository.Output> {
    const clicks = await prisma.offerClicks.count({
      where: {
        resource_id: input.resourceId
      }
    })

    return {
      clicks: clicks
    }
  }

  async getOffersWithClicksCount(input: GetOffersWithClicksCountRepo.Input): Promise<GetOffersWithClicksCountRepo.Output> {
    const offers = await prisma.offer.findMany({
      where: {
        Resources: {
          user_id: input.user_id
        }
      }, include: {
        _count: {
          select: {
            offer_clicks: true,
          }
        }
      }, orderBy: {
        offer_clicks: {
          _count: 'desc'
        }
      }, take: 10
    })

    return offers
  }
}