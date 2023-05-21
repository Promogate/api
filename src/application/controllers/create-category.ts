import { VerifiedTokenRequest } from '@/domain/models';
import { prisma } from '@/main/config';
import { Response } from 'express';

/*eslint-disable @typescript-eslint/no-explicit-any*/
class CreateCategoryController {
  async handle(req: VerifiedTokenRequest, res: Response): Promise<Response> {
    const { resourceId } = req.params as { resourceId: string };
    const body = req.body as { name: string };

    try {
      const category = await prisma.category.create({
        data: {
          name: body.name,
          resources_id: resourceId
        }
      });
  
      return res.status(201).json({
        status: 'success',
        message: 'Categoria criada com sucesso!',
        category
      });
  
    } catch (error: any) {
      return res.status(400).json({
        status: 'error',
        error: error.message,
        message: 'Falha ao tentar criar uma nova categoria.'
      });
    }
  }
}

export const createCategoryController = new CreateCategoryController();