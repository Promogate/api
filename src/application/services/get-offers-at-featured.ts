import { prisma } from '@/main/config';
import { injectable } from 'tsyringe';

@injectable()
export class GetOffersAtFeaturedService {
  async execute(user_id: string): Promise<number> {
    const countOffers = await prisma.offer.count({
      where: {
        resources: {
          AND: [
            {
              user_profile: {
                user_id: user_id,
              }
            },
            {
              offers: {
                every: {
                  is_featured: {
                    equals: true,
                  }
                }
              }
            }
          ]
        }
      }
    })

    return countOffers
  }
}
