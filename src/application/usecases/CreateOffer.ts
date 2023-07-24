import { SaveOfferRepository } from '@/data/contracts'
import { CreateOfferError, CreateShortlinkError } from '@/domain/error'
import { CreateOffer, CreateShortlink } from '@/domain/features'

export class CreateOfferUseCase implements CreateOffer {
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