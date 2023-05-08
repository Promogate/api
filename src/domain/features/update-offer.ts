export interface IUpdateOffer {
  execute(input: IUpdateOffer.Input): Promise<IUpdateOffer.Ouput>
}

export namespace IUpdateOffer {
  export type Input = {
    offer_id: string;
    image?: string;
    old_price?: string;
    price?: string;
    destination_link: string;
    store_image?: string;
    expiration_date?: string;
  }

  export type Ouput = void
}