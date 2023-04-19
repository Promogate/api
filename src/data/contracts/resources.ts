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