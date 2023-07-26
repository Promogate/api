import { CreateApiKeyService } from '@/application/services';
import { AuthenticationRepository } from '@/data/repositories';
import { CreateApiKey } from '@/domain/features';
import { Request, Response } from 'express';

class CreateApiKeyController {
  constructor(private readonly createApiKeyService:CreateApiKey) {}

  async handle (req: Request & { user?: string }, res: Response): Promise<Response> {

    const result = await this.createApiKeyService.execute({ id: req.user as string });
    return res.status(200).json(result);
  }
}

const createAPiKeyRepository = new AuthenticationRepository()
const createApiKeyService = new CreateApiKeyService(createAPiKeyRepository)
export const createApiKeyController = new CreateApiKeyController(createApiKeyService);