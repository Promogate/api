import { prisma } from '@/main/config';
import { injectable } from 'tsyringe';

@injectable()
export class GetOffersAtShowcaseService {
  async execute(user_id: string): Promise<number> {
    const countOffers = await prisma.offer.count({
      where: {
        resources: {
          user_profile: {
            user_id: user_id
          }
        }
      }
    })

    console.log(countOffers);

    return countOffers
  }
}
