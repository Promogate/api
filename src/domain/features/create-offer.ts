import { CreateOfferError, CreateShortlinkError } from "@/domain/error";

export interface CreateOffer {
  execute(input: CreateOffer.Input): Promise<CreateOffer.Output>
}

export namespace CreateOffer {
  export type Input = {
    resourceId: string;
    image: string;
    title: string;
    oldPrice?: string;
    price: string;
    destinationLink: string;
    storeImage?: string;
    storeName: string;
    description?: string;
    expirationDate?: string;
    isFeatured?: boolean;
    isOnShowcase?: boolean;
    isFreeShipping?: boolean;
  }
  export type Output = void | CreateShortlinkError  | CreateOfferError
}