export interface FindOfferById {
  execute: (input: FindOfferById.Input) => Promise<FindOfferById.Output>
}

export namespace FindOfferById {
  export type Input = {
    id: string,
    methods?: Record<string, unknown>;
  }

  export type Output = {
    id: string,
    title: string,
    image: string,
    old_price: string | null,
    price: string,
    destination_link: string,
    store_image: string | null,
    expiration_date: string | null,
    resourceId: string
  }
}