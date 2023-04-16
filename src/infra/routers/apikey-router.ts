import { createApiKeyController } from '@/application/controllers';
import { Router } from 'express';

const apiKeyRouter = Router()

apiKeyRouter.post('/create', createApiKeyController.handle);

export { apiKeyRouter };
