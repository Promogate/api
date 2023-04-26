import { AddOfferClickRepository, GetOffersClicksRepository } from '@/data/contracts';
import { prisma } from '@/main/config';

/*eslint-disable @typescript-eslint/no-explicit-any*/
export class AnalyticsRepository implements AddOfferClickRepository, GetOffersClicksRepository {
  async addClick(input: AddOfferClickRepository.Input): Promise<void> {
    try {
      const offer = await prisma.offer.findUnique({
        where: { id: input.id }
      });

      if (offer === null) throw new Error('Offer not found via analytics repository')
      
      const resourcesAnalytics = await prisma.resourcesAnalytics.findUnique({
        where: {
          resources_id: offer.resources_id
        }
      })

      if (resourcesAnalytics === null) throw new Error('ResourceAnalytics not found via analytics repository')

      await prisma.offerClicks.create({
        data: {
          resources_analytics_id: resourcesAnalytics.id,
          offer_id: offer.id,
          resource_id: offer.resources_id
        }
      })
    } catch (error: any) {
      throw new Error('Failed to add click')
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
}