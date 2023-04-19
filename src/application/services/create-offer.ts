import {
  FindAPIKeyRepository,
  FindUserByIdIncludingResourcesRepository,
  SaveOfferRepository
} from '@/data/contracts';
import { CreateOffer } from '@/domain/features';
import dayjs from 'dayjs';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateOfferService implements CreateOffer {
  constructor(
    @inject('AccessKeysRepository')
    private readonly accessKeysRepository: FindAPIKeyRepository,
    @inject('ResourcesRepository')
    private readonly resourcesRepository: SaveOfferRepository,
    @inject('UserRepository')
    private readonly userRepository: FindUserByIdIncludingResourcesRepository
  ) { }

  async execute(input: CreateOffer.Input): Promise<CreateOffer.Output> {
    const { userId } = await this.accessKeysRepository.find({ apiKey: input.apiKey })

    const { resources } = await this.userRepository.findByIdIncludingResources({
      id: userId as string
    })

    const expirationDate = dayjs(input.expirationDate).format('DD/MM/YYYY').toString();

    await this.resourcesRepository.saveOffer({
      image: input.image,
      title: input.title,
      price: input.price,
      oldPrice: input.oldPrice,
      expirationDate,
      storeImage: input.storeImage,
      destinationLink: input.destinationLink,
      resourceId: resources.id
    })
  }
}