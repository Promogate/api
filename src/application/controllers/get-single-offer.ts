import { prisma } from "@/main/config";
import { Request, Response } from "express";

/*eslint-disable @typescript-eslint/no-explicit-any*/
export class GetSingleOfferController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { offerId, resourceId } = req.params as { offerId: string, resourceId: string };
    const { utm_click } = req.query as { utm_click?: string };

    try {
      const offer = prisma.offer.findUnique({
        where: {
          id: offerId
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
        return res.status(400).json({
          status: "error",
          error: "Oferta não encontrada",
          message: "Algo deu erro ao tentar criar uma nova oferta"
        });
      }

      if (utm_click) {
        const resource = prisma.analytics.update({
          where: {
            resources_id: resourceId,
          }, data: {
            offer_clicks: {
              create: {
                offer_id: offerId,
              }
            }
          }
        });

        const transaction = await prisma.$transaction([offer, resource]);

        return res.status(200).json({
          status: "success",
          message: "Oferta encontrada",
          offer: transaction[0]
        });
      }

      const transaction = await prisma.$transaction([offer]);

      return res.status(200).json({
        status: "success",
        message: "Oferta encontrada",
        offer: transaction[0]
      });
    } catch (error: any) {
      return res.status(400).json({
        status: "error",
        error: error.message,
        message: "Algo deu erro ao tentar criar uma nova oferta"
      });
    }
  }
}

export const getSingleOfferController = new GetSingleOfferController();