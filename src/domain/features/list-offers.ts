import { Offer } from '@prisma/client'

export interface ListOffers {
  execute: () => Promise<ListOffers.Output>
}

export namespace ListOffers {
  export type Output = Offer[]
}