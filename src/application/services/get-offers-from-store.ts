import { prisma } from '@/main/config'
import { Offer, UserProfile } from '@prisma/client'
import { injectable } from 'tsyringe'

export interface IGetOffersFromStore {
  execute(input: IGetOffersFromStore.Input): Promise<IGetOffersFromStore.Output>
}

export namespace IGetOffersFromStore {
  export type Input = {
    storeName: string
  }

  export type Output = (UserProfile & {
    resources: {
        offers: (Offer & {
            _count: {
                offer_clicks: number;
            };
        })[];
    } | null;
})
}

@injectable()
export class GetOffersFromStoreService implements IGetOffersFromStore {
  async execute(input: IGetOffersFromStore.Input): Promise<IGetOffersFromStore.Output> {
    const result = await prisma.userProfile.findFirst({
      where: {
        store_name: {
          equals: input.storeName,
          mode: 'insensitive',
        }
      }, include: {
        resources: {
          select: {
            offers: {
              take: 50,
              where: {
                is_on_showcase: {
                  equals: true,
                }
              }, include: {
                _count: {
                  select: {
                    offer_clicks: true
                  }
                }
              }
            }
          }
        }
      }
    })

    if (!result || !result.resources?.offers) throw new Error('Falha ao encontrar as ofertas da loja.')

    return result
  }
}