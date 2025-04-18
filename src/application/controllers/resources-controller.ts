import { CreateOffer, GetOffersFromStore, GetStoreData, UpdateOffer, UpdateOfferFeaturedStatus, UpdateOfferShowcaseStatus } from "@/domain/features";
import { HttpServer } from "@/infra/http";
import { prisma } from "@/main/config";
import { verifyToken } from "../middlewares";
import { ErrorHandler, HttpStatusCode } from "../utils";
import { Request, Response } from "express";

export class ResourcesController {
  constructor(
    httpServer: HttpServer,
    getOffersFromStore: GetOffersFromStore,
    getStoreData: GetStoreData,
    createOffer: CreateOffer,
    updateOffer: UpdateOffer,
    updateOfferShowcaseStatus: UpdateOfferShowcaseStatus,
    updateOfferFeaturedStatus: UpdateOfferFeaturedStatus
  ) {
    httpServer.on("get", "/resources/stores", [], async function (request: Request, response: Response) {
      const output = await prisma.userProfile.findMany({
        select: {
          store_name: true,
        }
      });
      response.json(output).status(200).send();
    });

    httpServer.on("get", "/resources/offers/:store", [], async function (request: Request, response: Response) {
      // const output = await getOffersFromStore.execute(params);
      // response.json(output).status(200).send();
    });

    httpServer.on("get", "/resources/store/:store", [], async function (request: Request, response: Response) {
      // const output = await getStoreData.execute(params);
      // response.json(output).status(200).send();
    });

    httpServer.on("get", "/resources/:resourceId/offer/:offerId", [], async function (request: Request, response: Response) {
      try {
        const offer = prisma.offer.findUnique({
          where: {
            id: request.params.offerId
          }, include: {
            _count: {
              select: {
                offer_clicks: true,
              }
            },
            resources: {
              select: {
                user_profile: {
                  select: {
                    store_name: true,
                    store_name_display: true,
                    store_image: true,
                    social_media: true,
                  }
                },
                offers: {
                  where: {
                    is_featured: true
                  }
                }
              }
            }
          }
        });

        if (!offer) {
          throw new ErrorHandler({
            statusCode: HttpStatusCode.INTERNAL_SERVER,
            name: "OfferNotFound",
            message: "Oferta não encontrada"
          });
        }

        if (request.params.utm_click) {
          const resource = prisma.analytics.update({
            where: {
              resources_id: request.params.resourceId,
            }, data: {
              offer_clicks: {
                create: {
                  offer_id: request.params.offerId,
                }
              }
            }
          });

          const output = await prisma.$transaction([offer, resource]);

          return response.json(output[0]).status(200).send();
        }

        const output = await prisma.$transaction([offer]);

        return output[0];
      } catch (error: any) {
        throw new ErrorHandler({
          statusCode: HttpStatusCode.INTERNAL_SERVER,
          name: "FailedToGetOffers",
          message: error.message
        });
      }
    });

    httpServer.on("post", "/resources/:resourceId/offer/create", [verifyToken], async function (request: Request, response: Response) {
      const output = await createOffer.execute({...request.body, resourceId: request.params.resourceId});
      return response.json(output).status(200).send();
    });

    httpServer.on("post", "/resources/:resourceId/category/create", [verifyToken], async function (request: Request, response: Response) {
      try {
        const output = await prisma.category.create({
          data: {
            name: request.body.name,
            resources_id: request.params.resourceId
          }
        });
    
        return response.json(output).status(200).send();
    
      } catch (error: any) {
        throw new ErrorHandler({
          statusCode: HttpStatusCode.INTERNAL_SERVER,
          name: "FailedToCreateCategory",
          message: error.message
        });
      }
    });

    httpServer.on("post", "/resources/category/:categoryId/subcategory/create", [verifyToken], async function (request: Request, response: Response) {
      try {
        const output = await prisma.subCategory.create({
          data: {
            name: request.body.name,
            category_id: request.params.categoryId
          }
        });

        return response.json(output).status(200).send();
      } catch (error: any) {
        throw new ErrorHandler({
          statusCode: HttpStatusCode.INTERNAL_SERVER,
          name: "FailedToGetSubCategories",
          message: error.message
        });
      }
    });

    httpServer.on("get", "/resources/:resourceId/categories", [verifyToken], async function (request: Request, response: Response) {
      try {
        const output = await prisma.category.findMany({
          where: {
            resources_id: request.params.resourceId,
          },
          include: {
            sub_categories: true
          }
        });
        return response.json(output).status(200).send();
      } catch (error: any) {
        throw new ErrorHandler({
          statusCode: HttpStatusCode.INTERNAL_SERVER,
          name: "FailedToGetCategories",
          message: error.message
        });
      }
    });

    httpServer.on("get", "/resources/:resourcesId/offers", [verifyToken], async function (request: Request, response: Response) {
      try {
        const output = await prisma.offer.findMany({
          where: {
            resources_id: request.params.resourcesId,
          }, include: {
            categories: {
              select: {
                category: {
                  include: {
                    sub_categories: true
                  }
                }
              }
            }
          }
        });
        return response.json(output).status(200);
      } catch (error: any) {
        throw new ErrorHandler({
          statusCode: HttpStatusCode.INTERNAL_SERVER,
          name: "FailedToGetOffers",
          message: error.message
        });
      }
    });

    httpServer.on("get", "/resources/offer/:offerId", [verifyToken], async function (request: Request, response: Response) {
      try {
        const output = await prisma.offer.findUnique({
          where: {
            id: request.params.offerId
          }
        });
        return response.json(output).status(200).send();
      } catch (error: any) {
        throw new ErrorHandler({
          statusCode: HttpStatusCode.INTERNAL_SERVER,
          name: "FailedToDeleteOffer",
          message: error.message
        });
      }
    });

    httpServer.on("put", "/resources/:resourceId/offer/:offerId/update", [verifyToken], async function (request: Request, response: Response) {
      const output = await updateOffer.execute({
        offerId: request.params.offerId,
        image: request.body.image,
        title: request.body.title,
        oldPrice: request.body.old_price,
        price: request.body.price,
        destinationLink: request.body.destination_link,
        storeName: request.body.store_name,
        expirationDate: request.body.expiration_date,
        description: request.body.description,
      });
      return response.json(output).status(200).send();
    });

    httpServer.on("put", "/resources/offer/:offerId/update/showcase", [verifyToken], async function (request: Request, response: Response) {
      const output = await updateOfferShowcaseStatus.execute({
        is_on_showcase: request.body.is_on_showcase,
        offer_id: request.params.offerId,
        user_id: request.body.userId
      });
      return response.json(output).status(200).send();
    });

    httpServer.on("put", "/resources/offer/:offerId/update/featured", [verifyToken], async function (request: Request, response: Response) {
      const output = await updateOfferFeaturedStatus.execute({
        is_featured: request.body.is_featured,
        offer_id: request.params.offerId, //NEED TO EXTEND REQUEST TYPE
        user_id: request.params.user, //NEED TO EXTEND REQUEST TYPE
        role: request.params.role
      });
      return response.json(output).status(200).send();
    });

    httpServer.on("put", "/resources/:resourcesId/offer/:offerId/update/category", [verifyToken], async function (request: Request, response: Response) {
      try {
        const output = await prisma.categoriesOnOffer.create({
          data: {
            resource_id: request.params.resourcesId,
            offer_id: request.params.offerId,
            category_id: request.body.categoryId,
          }
        });
        return response.json(output).status(200).send();
      } catch (error: any) {
        throw new ErrorHandler({
          statusCode: HttpStatusCode.INTERNAL_SERVER,
          name: "FailedToConnectCategory",
          message: error.message
        });
      }
    });

    httpServer.on("delete", "/resources/offer/:id", [verifyToken], async function (request: Request, response: Response) {
      try {
        const output = await prisma.offer.delete({
          where: {
            id: request.params.id
          }
        });
        return response.json(output).status(200).send();
      } catch (error: any) {
        throw new ErrorHandler({
          statusCode: HttpStatusCode.INTERNAL_SERVER,
          name: "FailedToDeleteOffer",
          message: error.message
        });
      }
    });
    
    httpServer.on("get", "/resources/:resourcesId/redirectors", [verifyToken], async function (request: Request, response: Response) {
      try {
        const output = await prisma.redirector.findMany({
          where: {
            resources_id: request.params.resourcesId
          },
          include: {
            groups: true
          }
        });
        return response.json(output).status(200).send();
      } catch (error: any) {
        throw new ErrorHandler({
          statusCode: HttpStatusCode.INTERNAL_SERVER,
          name: "FailedToDeleteOffer",
          message: error.message
        });
      }
    });
  }
}