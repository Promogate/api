import { DeleteApiKeyService } from '@/application/services';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class DeleteApiKeyController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { id } = req.params as { id: string }
    const deleteApiKeyService = container.resolve(DeleteApiKeyService);
    await deleteApiKeyService.execute({ id });
    return res.status(200).send();
  }
}

export const deleteApiKeyController = new DeleteApiKeyController();