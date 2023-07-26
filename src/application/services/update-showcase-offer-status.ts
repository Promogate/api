import { verifyOfferLimit } from '@/application/utils';
import { UpdateOfferShowcaseStatus } from '@/domain/features';
import { prisma } from '@/main/config';
import { container } from 'tsyringe';
import { GetOffersAtShowcaseService } from './get-offers-at-showcase';

export class UpdateShowcaseOfferStatusService implements UpdateOfferShowcaseStatus {
  async execute(input: UpdateOfferShowcaseStatus.Input): Promise<UpdateOfferShowcaseStatus.Output> {
    const { is_on_showcase, offer_id, user_id } = input;

    const numberOfOffersAtShowcase = container.resolve(GetOffersAtShowcaseService);
    const offerOnShowcase = await numberOfOffersAtShowcase.execute(user_id);

    const userProfile = await prisma.userProfile.findFirst({
      where: {
        user_id: user_id
      }
    })

    verifyOfferLimit({
      is_on_showcase: is_on_showcase,
      role: userProfile?.role as string,
      offerNumber: offerOnShowcase
    })

    const offer = await prisma.offer.update({
      where: {
        id: offer_id,
      }, data: {
        is_on_showcase: is_on_showcase,
      }
    })

    return offer
    //
  }
}