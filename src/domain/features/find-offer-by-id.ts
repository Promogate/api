export interface FindOfferById {
  execute: (input: FindOfferById.Input) => Promise<FindOfferById.Output>
}

export namespace FindOfferById {
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
  }
}