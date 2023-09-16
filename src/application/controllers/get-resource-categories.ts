import { VerifiedTokenRequest } from "@/domain/models";
import { prisma } from "@/main/config";
import { Response } from "express";

/*eslint-disable @typescript-eslint/no-explicit-any*/
class GetResourceCategoriesController {
  async handle(req: VerifiedTokenRequest, res: Response): Promise<Response> {
    const { resourceId } = req.params as { resourceId: string };

    try {
      const categories = await prisma.category.findMany({
        where: {
          resources_id: resourceId,
        },
        include: {
          sub_categories: true
        }
      });
  
      return res.status(200).json({
        status: "success",
        message: "Categorias encontradas",
        categories
      });
    } catch (error: any) {
      return res.status(400).json({
        status: "error",
        error: error.message,
        message: "Falha ao tentar criar uma nova categoria."
      });
    }
  }
}

export const getResourceCategoriesController = new GetResourceCategoriesController();