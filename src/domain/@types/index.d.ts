export type CreateProfileInput = { 
  storeImage: string; 
  storeName: string;
  userId: string;
}

export type UpdateOfferParams = {
  image?: string,
  title?: string,
  price?: string,
  old_price?: string,
  destination_link?: string,
  store_name?: string,
  expiration_date?: string,
  description?: string
}
