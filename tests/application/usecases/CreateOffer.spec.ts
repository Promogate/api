import { SaveOfferRepository } from '@/data/contracts';
import { mock, MockProxy } from 'jest-mock-extended';

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
    storeImage: string;
    storeName: string;
    description?: string;
    expirationDate: string;
    shortLink: string
    isFeatured?: boolean;
    isOnShowcase?: boolean;
    isFreeShipping?: boolean;
  }
  export type Output = void
}

class CreateOfferUseCase implements CreateOffer {
  constructor(private readonly offerRepository: SaveOfferRepository) {}

  async execute(input: CreateOffer.Input): Promise<void> {
    await this.offerRepository.saveOffer(input)
  }
}

describe('CreateOffer', () => {
  let offerRepository: MockProxy<SaveOfferRepository>
  let sut: CreateOfferUseCase
  const input = {
    resourceId: 'any_id',
    image: 'any_image',
    title: 'any_title',
    oldPrice: 'any_price',
    price: 'any_price',
    destinationLink: 'any_link',
    storeImage: 'any_image',
    storeName: 'any_name',
    description: 'any_description',
    expirationDate: 'any_date',
    shortLink: 'any_link',
    isFeatured: false,
    isOnShowcase: false,
    isFreeShipping: false,
  }

  beforeEach(() => {
    offerRepository = mock()
    sut = new CreateOfferUseCase(offerRepository)
  })

  test('it should call CreateOfferUseCase with correct params', async () => {
    await sut.execute(input)
    expect(offerRepository.saveOffer).toHaveBeenCalledWith({
      resourceId: 'any_id',
      image: 'any_image',
      title: 'any_title',
      oldPrice: 'any_price',
      price: 'any_price',
      destinationLink: 'any_link',
      storeImage: 'any_image',
      storeName: 'any_name',
      description: 'any_description',
      expirationDate: 'any_date',
      shortLink: 'any_link',
      isFeatured: false,
      isOnShowcase: false,
      isFreeShipping: false,
    })
  })
})

export { };
