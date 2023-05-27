import { Offer } from '@prisma/client';

export interface UpdateOfferFeaturedStatus {
  execute(input: UpdateOfferFeaturedStatus.Input): Promise<UpdateOfferFeaturedStatus.Output>
}

export namespace UpdateOfferFeaturedStatus {
  export type Input = {
    offer_id: string;
    is_featured: boolean;
    user_id: string;
    role: string
  }

  export type Output = Offer
}
