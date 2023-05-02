import { ISearchOfferByWord } from '@/data/contracts';
import { prisma } from '@/main/config';

export class OfferRepository implements ISearchOfferByWord {
  async searchByWord(input: ISearchOfferByWord.Input): Promise<ISearchOfferByWord.Output> {
    const offers = await prisma.offer.findMany({
      where: {
        AND: [
          {
            resources: {
              user: {
                api_key: {
                  key: input.api_key
                }
              }
            }
          }, {
            title: {
              contains: input.word,
              mode: 'insensitive'
            }
          }
        ]
      }
    })

    return offers
  }
}