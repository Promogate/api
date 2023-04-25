import { AddOfferClickRepository } from '@/data/contracts';
import { prisma } from '@/main/config';

/*eslint-disable @typescript-eslint/no-explicit-any*/
export class AnalyticsRepository implements AddOfferClickRepository {
  async addClick(input: AddOfferClickRepository.Input): Promise<void> {
    try {
      const offer = await prisma.offer.findUnique({
        where: { id: input.id }
      });

      if (offer === null) throw new Error('Offer not found via analytics repository')
      
      const resourcesAnalytics = await prisma.resourcesAnalytics.findUnique({
        where: {
          resourcesId: offer.resourcesId
        }
      })

      if (resourcesAnalytics === null) throw new Error('ResourceAnalytics not found via analytics repository')

      await prisma.resourcesAnalyticsClicks.create({
        data: {
          resources_analytics_id: resourcesAnalytics.id,
          offer_id: offer.id,
          resource_id: offer.resourcesId
        }
      })
    } catch (error: any) {
      throw new Error('Failed to add click')
    }
  }

}