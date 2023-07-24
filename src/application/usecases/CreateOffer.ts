import { GetNumberOfOffersRepository, SaveOfferRepository } from '@/data/contracts'
import { CreateOfferError, CreateShortlinkError, OfferLimitError } from '@/domain/error'
import { CreateOffer, CreateShortlink } from '@/domain/features'

export class CreateOfferUseCase implements CreateOffer {
  constructor(
    private readonly resourceRepository: SaveOfferRepository & GetNumberOfOffersRepository,
    private readonly shortlinkService: CreateShortlink
  ) { }

  async execute(input: CreateOffer.Input): Promise<void> {
    const numberOfOffers = await this.resourceRepository.getNumberOfOffers({ resourceId: input.resourceId })
    if (numberOfOffers.offersCount === 50 && numberOfOffers.role === 'FREE') throw new OfferLimitError()
    const shortLink = await this.shortlinkService.execute({
      destinationLink: input.destinationLink,
      offerId: 'UNNECESSARY',
      fullLink: 'UNNECESSARY',
      resourceId: input.resourceId,
      storeName: input.storeName
    })
    if (!shortLink) throw new CreateShortlinkError()
    try {
      await this.resourceRepository.saveOffer({ ...input, shortLink: shortLink.shortLink })
    } catch (error: any) {
      throw new CreateOfferError()
    }
  }
}
