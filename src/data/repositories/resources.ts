import { makeSkipPointer } from "@/application/utils";
import {
  FindOfferByIdRepository,
  GetNumberOfOffersRepository,
  IGetShowcaseOffersRepo,
  IGetStoreDataRepo,
  ListOffersRepository,
  SaveOfferRepository,
  SaveOffersFromCSVRepository
} from "@/data/contracts";
import { prisma } from "@/main/config";

/*eslint-disable @typescript-eslint/no-explicit-any*/
export class ResourcesRepository implements
  SaveOfferRepository,
  ListOffersRepository,
  FindOfferByIdRepository,
  SaveOffersFromCSVRepository,
  IGetShowcaseOffersRepo,
  IGetStoreDataRepo,
  GetNumberOfOffersRepository {

  async getNumberOfOffers(input: GetNumberOfOffersRepository.Input): Promise<GetNumberOfOffersRepository.Output> {
    const result = await prisma.resources.findFirst({
      where: {
        id: input.resourceId,
      },
      include: {
        user_profile: {
          select: {
            role: true
          }
        },
        _count: {
          select: {
            offers: true
          }
        }
      }
    });

    if (!result || !result.user_profile) return;

    return {
      offersCount: result._count.offers,
      role: result.user_profile.role
    };
  }

  async getStore(input: IGetStoreDataRepo.Input): Promise<any> {
    const store = await prisma.userProfile.findUnique({
      where: {
        store_name: input.store_name
      }
    });

    if (!store) throw new Error("Loja não encontrada!");

    return store;
  }

  async getOffers(input: IGetShowcaseOffersRepo.Input): Promise<IGetShowcaseOffersRepo.Output> {
    const showcaseOffers = await prisma.offer.findMany({
      where: {
        resources: {
          user_profile: {
            store_name: input.store_name,
          }
        }
      }
    });

    return showcaseOffers;
  }

  async saveOffer(input: SaveOfferRepository.Input): Promise<SaveOfferRepository.Output> {
    try {
      await prisma.offer.create({
        data: {
          resources_id: input.resourceId,
          image: input.image,
          title: input.title,
          old_price: input.oldPrice,
          price: input.price,
          store_image: input.storeImage,
          destination_link: input.destinationLink,
          expiration_date: input.expirationDate,
          store_name: "Promogate", //TODO: Need to change
          short_link: "pgate.app", //TODO: Need to change
        }
      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async listOffers({
    user_id,
    per_page = 10,
    page = 1,
  }: ListOffersRepository.Input): Promise<ListOffersRepository.Output> {
    try {
      const offers = prisma.offer.findMany({
        where: {
          resources: {
            user_profile: {
              user_id: user_id,
            }
          }
        },
        skip: makeSkipPointer(page, per_page),
        take: per_page,
        orderBy: {
          created_at: "desc"
        }
      });

      const totalOffers = prisma.offer.count({
        where: {
          resources: {
            user_profile: {
              user_id: user_id,
            }
          }
        }
      });

      const featuredOffers = prisma.offer.count({
        where: {
          AND: [
            {
              resources: {
                user_profile: {
                  user_id: user_id,
                }
              }
            },
            {
              is_featured: {
                equals: true,
              }
            }
          ]
        }
      });

      const showcaseOffers = prisma.offer.count({
        where: {
          AND: [
            {
              resources: {
                user_profile: {
                  user_id: user_id,
                }
              }
            },
            {
              is_on_showcase: {
                equals: true,
              }
            }
          ]
        }
      });

      const transaction = await prisma.$transaction([
        offers,
        totalOffers,
        featuredOffers,
        showcaseOffers
      ]);

      return {
        page: page,
        per_page: per_page,
        total_offers: transaction[1],
        total_featured_offers: transaction[2],
        total_showcase_offers: transaction[3],
        offers: transaction[0],
      };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async findOfferById(input: FindOfferByIdRepository.Input): Promise<FindOfferByIdRepository.Output> {
    try {
      const offer = await prisma.offer.findUnique({
        where: {
          id: input.id
        }
      });


      if (offer === null) throw new Error("Failed to find offer in repo");

      return {
        id: offer.id,
        title: offer.title,
        image: offer.image,
        price: offer.price,
        old_price: offer.old_price,
        destination_link: offer.destination_link,
        store_image: offer.store_image,
        expiration_date: offer.expiration_date,
        resourceId: offer.resources_id
      };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async saveOffersFromCSV(input: SaveOffersFromCSVRepository.Input): Promise<SaveOffersFromCSVRepository.Output> {
    try {
      const offersWithResourceId = input.offers.map((el) => {
        return {
          ...el,
          resources_id: input.resource_id,
          store_name: "Promogate", //TODO: Need to change
          short_link: "pgate.app/" //TODO: Need to change
        };
      });

      await prisma.offer.createMany({
        data: offersWithResourceId
      });
    } catch {
      throw new Error("Failed to save offers from CSV");
    }
  }
}