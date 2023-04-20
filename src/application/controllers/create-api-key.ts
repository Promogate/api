import { CreateApiKeyService } from '@/application/services';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateApiKeyController {
  async handle (req: Request & { user?: string }, res: Response): Promise<Response> {
    const createApiKeyService = container.resolve(CreateApiKeyService);

    const result = await createApiKeyService.execute({ id: req.user as string });
    return res.status(200).json(result);
  }
}

export const createApiKeyController = new CreateApiKeyController();