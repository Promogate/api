import { prisma } from '@/main/config';

export class GetOffersAtShowcaseService {
  async execute(user_id: string): Promise<number> {
    const countOffers = await prisma.offer.count({
      where: {
        AND: [
          {
            is_on_showcase: {
              equals: true,
            },
            resources: {
              user_profile: {
                user_id: {
                  equals: user_id,
                }
              }
            }
          }
        ]
      }
    })

    return countOffers
  }
}
