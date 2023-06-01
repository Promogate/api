import { Offer } from '@prisma/client';

export interface UpdateOffer {
  execute(input: UpdateOffer.Input): Promise<UpdateOffer.Ouput>
}

export namespace UpdateOffer {
  export type Input = {
    offerId: string;
    image?: string;
    title?: string;
    oldPrice?: string;
    price?: string;
    destinationLink?: string;
    storeName?: string;
    expirationDate?: string;
    description?: string;
  }

  export type Ouput = Offer
}