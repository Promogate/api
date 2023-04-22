import { ListAPIKeysService } from '@/application/services';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListAPIKeysController {
  async handle (req: Request & { user?: string }, res: Response): Promise<Response> {
    const listAPIKeysService = container.resolve(ListAPIKeysService);
    const result = await listAPIKeysService.execute({ userId: req.user as string });
    return res.status(200).json(result);
  }
}

export const listAPIKeysController = new ListAPIKeysController();