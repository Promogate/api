import { createApiKeyController } from '@/application/controllers';
import { verifyToken } from '@/application/middlewares';
import { Router } from 'express';

const apiKeyRouter = Router()

apiKeyRouter.use(verifyToken)
apiKeyRouter.post('/create', createApiKeyController.handle);

export { apiKeyRouter };
