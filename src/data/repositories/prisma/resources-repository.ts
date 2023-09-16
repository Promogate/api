import { ErrorHandler, HttpStatusCode } from "@/application/utils";
import { GetNumberOfOffersRepository, SaveOfferRepository } from "@/data/contracts";
import { prisma } from "@/main/config";

export class ResourcesRepository implements
  SaveOfferRepository,
  GetNumberOfOffersRepository {

  async getNumberOfOffers(input: GetNumberOfOffersRepository.Input): Promise<GetNumberOfOffersRepository.Output> {
    try {
      const result = await prisma.resources.findFirst({
        where: { id: input.resourceId },
        include: {
          _count: {
            select: {
              offers: true
            }
          },
          user_profile: {
            select: {
              role: true
            }
          }
        }
      });
      if (!result || !result.user_profile) {
        throw new ErrorHandler({
          statusCode: HttpStatusCode.BAD_REQUEST,
          name: "RepositoryFailedToGetNumberOfOffers",
          message: "Repositório falhou ao tentar buscar a quantidade de ofertas já cadastradas"
        });
      }
      return {
        offersCount: result._count.offers,
        role: result.user_profile.role
      };
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: HttpStatusCode.BAD_REQUEST,
        name: "RepositoryFailedToGetNumberOfOffers",
        message: "Repositório falhou ao tentar buscar a quantidade de ofertas já cadastradas"
      });
    }
  }
  async saveOffer(input: SaveOfferRepository.Input): Promise<SaveOfferRepository.Output> {
    try {
      await prisma.offer.create({
        data: {
          title: input.title,
          destination_link: input.destinationLink,
          image: input.image,
          price: input.price,
          short_link: input.shortLink,
          store_name: input.storeName,
          description: input.description,
          old_price: input.oldPrice,
          store_image: input.storeImage,
          resources_id: input.resourceId,
          expiration_date: input.expirationDate,
          is_featured: input.isFeatured,
          is_free_shipping: input.isFreeShipping,
          is_on_showcase: input.isOnShowcase,
        }
      });
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: HttpStatusCode.BAD_REQUEST,
        name: "RepositoryFailedToSaveOffer",
        message: "Repositório falhou ao tentar salvar uma nova oferta"
      });
    }
  }

}