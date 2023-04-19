export interface CreateOffer {
  execute: (input: CreateOffer.Input) => Promise<CreateOffer.Output>
}

export namespace CreateOffer {
  export type Input = {
    image: string
    title: string
    price: string
    oldPrice: string
    destinationLink: string
    storeImage: string
    expirationDate: string
    apiKey: string
  }

  export type Output = void
}