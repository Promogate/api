import { AddOfferClickRepository } from '@/data/contracts';
import { prisma } from '@/main/config';

/*eslint-disable @typescript-eslint/no-explicit-any*/
export class AnalyticsRepository implements AddOfferClickRepository {
  async addClick (input: AddOfferClickRepository.Input): Promise<void> {
    //
    try {
      const offer = await prisma.offer.findUnique({
        where: { id: input.id }
      });

      if (!offer) throw new Error('Offer not found...');

      await prisma.offer.update({
        where: { id: offer.id },
        data: {
          clicks: offer.clicks + 1
        }
      })

    } catch (error: any) {
      throw new Error('Failed to add click')
    }
  }

}