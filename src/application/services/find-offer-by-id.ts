import { FindOfferById } from '@/domain/features';


export class FindOfferByIdService implements FindOfferById {
  async execute (input: FindOfferById.Input): Promise<FindOfferById.Output> {
    //
    return {
      id: '',
      title: '',
      image: '',
      old_price: '',
      price: '',
      destination_link: '',
      store_image: '',
      expiration_date: '',
    }
  }
}