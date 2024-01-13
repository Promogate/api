import { Offer } from "@prisma/client";

export interface UpdateOfferShowcaseStatus {
    execute(input: UpdateOfferShowcaseStatus.Input): Promise<UpdateOfferShowcaseStatus.Output>
  }
  
export  namespace UpdateOfferShowcaseStatus {
    export type Input = {
      offer_id: string;
      is_on_showcase: boolean;
      user_id: string;
    }
  
    export type Output = Offer
}