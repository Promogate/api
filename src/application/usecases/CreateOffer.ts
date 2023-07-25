import { ErrorHandler, HttpStatusCode } from '@/application/utils'
import { GetNumberOfOffersRepository, SaveOfferRepository } from '@/data/contracts'
import { CreateOfferError, CreateShortlinkError, OfferLimitError } from '@/domain/error'
import { CreateOffer, CreateShortlink } from '@/domain/features'
import dayjs from 'dayjs'

export class CreateOfferUseCase implements CreateOffer {
  constructor(
    private readonly resourceRepository: SaveOfferRepository & GetNumberOfOffersRepository,
    private readonly shortlinkService: CreateShortlink
  ) { }

  async execute(input: CreateOffer.Input): Promise<CreateOffer.Output> {
    const numberOfOffers = await this.resourceRepository.getNumberOfOffers({ resourceId: input.resourceId })
    if (!numberOfOffers) throw new ErrorHandler({
      statusCode: HttpStatusCode.BAD_REQUEST,
      name: 'FailedToVerifyUserError',
      message: 'Erro ao tentar validar usuário'
     })
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
      await this.resourceRepository.saveOffer({ 
        ...input, 
        shortLink: shortLink.shortLink,
        expirationDate: input.expirationDate ?? dayjs().add(30, 'days').toString()
      })
    } catch (error: any) {
      throw new CreateOfferError()
    }
  }
}
