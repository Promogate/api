import { Offer } from '@prisma/client'

export interface SaveOfferRepository {
  saveOffer: (input: SaveOfferRepository.Input) => Promise<SaveOfferRepository.Output>
}

export namespace SaveOfferRepository {
  export type Input = {
    resourceId: string
    image: string
    title: string
    oldPrice?: string
    price: string
    destinationLink: string
    storeImage: string
    expirationDate: string
  }

  export type Output = void
}

export interface ListOffersRepository {
  listOffers: (input: ListOffersRepository.Input) => Promise<ListOffersRepository.Output>
}

export namespace ListOffersRepository {
  export type Input = { resourceId: string }
  export type Output = Offer[]
}