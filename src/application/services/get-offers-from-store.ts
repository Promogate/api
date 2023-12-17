import { GetOffersFromStore } from "@/domain/features";
import { prisma } from "@/main/config";

export class GetOffersFromStoreService implements GetOffersFromStore {
  async execute(input: GetOffersFromStore.Input): Promise<GetOffersFromStore.Output> {
    const result = await prisma.userProfile.findFirst({
      where: {
        store_name: {
          equals: input.storeName,
          mode: "insensitive",
        }
      }, include: {
        social_media: true,
        resources: {
          select: {
            offers: {
              take: 50,
              where: {
                is_on_showcase: {
                  equals: true,
                }
              }, include: {
                _count: {
                  select: {
                    offer_clicks: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!result || !result.resources?.offers) throw new Error("Falha ao encontrar as ofertas da loja.");

    return result;
  }
}