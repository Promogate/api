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

export interface FindOfferByIdRepository {
  findOfferById: (input: FindOfferByIdRepository.Input) => Promise<FindOfferByIdRepository.Output>
}

export namespace FindOfferByIdRepository {
  export type Input = {
    id: string,
  }

  export type Output = {
    id: string,
    title: string,
    image: string,
    old_price: string | null,
    price: string,
    destination_link: string,
    store_image: string,
    expiration_date: string | null,
    resourceId: string
  }
}