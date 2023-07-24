import { SaveOfferRepository } from '@/data/contracts';
import { CreateOfferError, CreateShortlinkError } from '@/domain/error';
import { CreateShortlink } from '@/domain/features';
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
    isFeatured?: boolean;
    isOnShowcase?: boolean;
    isFreeShipping?: boolean;
  }
  export type Output = void | CreateShortlinkError
}

class CreateOfferUseCase implements CreateOffer {
  constructor(
    private readonly offerRepository: SaveOfferRepository,
    private readonly shortlinkService: CreateShortlink
  ) { }

  async execute(input: CreateOffer.Input): Promise<void> {
    const shortLink = await this.shortlinkService.execute({
      destinationLink: input.destinationLink,
      offerId: '',
      fullLink: '',
      resourceId: input.resourceId,
      storeName: input.storeName
    })
    if (!shortLink) throw new CreateShortlinkError()
    try {
      await this.offerRepository.saveOffer({ ...input, shortLink: shortLink.shortLink })
    } catch (error: any) {
      throw new CreateOfferError()
    }
  }
}


type Input = {
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

describe('CreateOffer', () => {
  let offerRepository: MockProxy<SaveOfferRepository>
  let shortlinkUseCase: MockProxy<CreateShortlink>
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
    isFeatured: false,
    isOnShowcase: false,
    isFreeShipping: false,
  }
  const shortlinkOuput = {
    id: 'any_id',
    code: 'any_code',
    createdAt: 'any_date',
    fullLink: 'any_link',
    offerId: 'any_id',
    resourceId: 'any_id',
    shortLink: 'any_link',
    storeName: 'any_name'
  }

  beforeEach(() => {
    offerRepository = mock()
    shortlinkUseCase = mock()
    sut = new CreateOfferUseCase(offerRepository, shortlinkUseCase)
  })

  test('it should call CreateOfferUseCase with correct params', async () => {
    shortlinkUseCase.execute.mockResolvedValue(shortlinkOuput)
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

  test('it should throw CreateShortlinkError if shortlink usecase returns undefined', async () => {
    shortlinkUseCase.execute.mockResolvedValueOnce(undefined)
    await expect(sut.execute(input)).rejects.toThrow(new CreateShortlinkError)
  })
})

export { };
