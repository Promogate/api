import { VerifiedTokenRequest } from "@/domain/models";
import { prisma } from "@/main/config";
import { Response } from "express";

/*eslint-disable @typescript-eslint/no-explicit-any*/
class CreateSubcategoryController {
  async handle(req: VerifiedTokenRequest, res: Response): Promise<Response> {
    const { categoryId } = req.params as { categoryId: string };
    const body = req.body as { name: string };

    try {
      const subcategory = await prisma.subCategory.create({
        data: {
          name: body.name,
          category_id: categoryId
        }
      });
  
      return res.status(201).json({
        status: "success",
        message: "Categoria criada com sucesso!",
        subcategory
      });
  
    } catch (error: any) {
      return res.status(400).json({
        status: "error",
        error: error.message,
        message: "Falha ao tentar criar uma nova subcategoria."
      });
    }
  }
}

export const createSubcategoryController = new CreateSubcategoryController();