import { verifyFeaturedLimit } from '@/application/utils';
import { UpdateOfferFeaturedStatus } from '@/domain/features';
import { prisma } from '@/main/config';
import { GetOffersAtFeaturedService } from './get-offers-at-featured';

export class UpdateFeaturedOfferStatusService implements UpdateOfferFeaturedStatus {
  async execute(input: UpdateOfferFeaturedStatus.Input): Promise<UpdateOfferFeaturedStatus.Output> {
    const getFeaturedOffersNumberService = new GetOffersAtFeaturedService()
    const featuredOffers = await getFeaturedOffersNumberService.execute(input.user_id)

    verifyFeaturedLimit({
      is_featured: input.is_featured,
      role: input.role,
      offerNumber: featuredOffers
    })

    const offer = await prisma.offer.update({
      where: {
        id: input.offer_id,
      }, data: {
        is_featured: input.is_featured
      }
    })
    
    return offer
  }
}