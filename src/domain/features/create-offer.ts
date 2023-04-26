export interface CreateOffer {
  execute: (input: CreateOffer.Input) => Promise<CreateOffer.Output>
}

export namespace CreateOffer {
  export type Input = {
    image: string
    title: string
    price: string
    oldPrice: string
    destination_link: string
    store_image: string
    expiration_date: string
    apiKey: string
  }

  export type Output = void
}