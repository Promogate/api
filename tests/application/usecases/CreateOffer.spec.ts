import { CreateOfferUseCase } from '@/application/usecases';
import { GetNumberOfOffersRepository, SaveOfferRepository } from '@/data/contracts';
import { CreateOfferError, CreateShortlinkError, GetNumberOfOffersError, OfferLimitError } from '@/domain/error';
import { CreateShortlink } from '@/domain/features';
import { MockProxy, mock } from 'jest-mock-extended';

describe('CreateOffer', () => {
  let offerRepository: MockProxy<SaveOfferRepository & GetNumberOfOffersRepository>
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
  const getNumberOfOffersOuput = { offersCount: 49, role: 'FREE' }

  beforeEach(() => {
    offerRepository = mock()
    shortlinkUseCase = mock()
    sut = new CreateOfferUseCase(offerRepository, shortlinkUseCase)
  })

  test('it should call CreateOfferUseCase with correct params', async () => {
    offerRepository.getNumberOfOffers.mockResolvedValue(getNumberOfOffersOuput)
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
    offerRepository.getNumberOfOffers.mockResolvedValue(getNumberOfOffersOuput)
    shortlinkUseCase.execute.mockResolvedValueOnce(undefined)
    await expect(sut.execute(input)).rejects.toThrow(new CreateShortlinkError)
  })

  test('it should throw CreateOfferError if offerRepository save method fails', async () => {
    offerRepository.getNumberOfOffers.mockResolvedValue(getNumberOfOffersOuput)
    shortlinkUseCase.execute.mockResolvedValueOnce(shortlinkOuput)
    offerRepository.saveOffer.mockRejectedValue({})
    await expect(sut.execute(input)).rejects.toThrow(new CreateOfferError)
  })

  test('it should throw OfferLimitError if resourceRepository checkOfferNumber method', async () => {
    offerRepository.getNumberOfOffers.mockResolvedValueOnce({ offersCount: 50, role: 'FREE' })
    shortlinkUseCase.execute.mockResolvedValueOnce(shortlinkOuput)
    await expect(sut.execute(input)).rejects.toThrow(new OfferLimitError())
  })

  test('it should throw GetNumberOfOffersError when getNumberOfOffers method returns undefined', async () => {
    offerRepository.getNumberOfOffers.mockResolvedValueOnce(undefined)
    await expect(() => sut.execute(input)).rejects.toThrow(GetNumberOfOffersError)
  })
})

export { };
