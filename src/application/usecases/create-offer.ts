import { GetNumberOfOffersRepository, SaveOfferRepository } from "@/data/contracts";
import { CreateOfferError, CreateShortlinkError, GetNumberOfOffersError, OfferLimitError } from "@/domain/error";
import { CreateOffer, CreateShortlink } from "@/domain/features";
import { prisma } from "@/main/config";
import dayjs from "dayjs";

export class CreateOfferUseCase implements CreateOffer {
  constructor(
    private readonly resourceRepository: SaveOfferRepository & GetNumberOfOffersRepository,
    private shortlinkService: CreateShortlink
  ) { }

  async execute(input: CreateOffer.Input): Promise<CreateOffer.Output> {
    const numberOfOffers = await this.resourceRepository.getNumberOfOffers({ resourceId: input.resourceId });
    if (!numberOfOffers) throw new GetNumberOfOffersError();
    if (numberOfOffers.offersCount === 50 && numberOfOffers.role === "FREE") throw new OfferLimitError();
    try {
      const data = await this.resourceRepository.saveOffer({ 
        ...input, 
        shortLink: "",
        expirationDate: input.expirationDate ?? dayjs().add(30, "days").toString()
      });
      const shortLink = await this.shortlinkService.execute({
        destinationLink: input.destinationLink,
        offerId: data.id,
        fullLink: "UNNECESSARY",
        resourceId: input.resourceId,
        storeName: input.storeName
      });
      if (!shortLink) return;
      await prisma.offer.update({
        where: { id: data.id },
        data: {
          short_link: shortLink.shortLink
        }
      });

    } catch (error: any) {
      // throw new CreateOfferError(error.message);
      throw new Error(error.message);
    }
  }
}
