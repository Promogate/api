import {
  createApiKeyController,
  deleteApiKeyController,
  listAPIKeysController
} from '@/application/controllers';
import { verifyToken } from '@/application/middlewares';
import { Router } from 'express';

const apiKeyRouter = Router()

apiKeyRouter.use(verifyToken)
apiKeyRouter.post('/create', createApiKeyController.handle);
apiKeyRouter.get('/all', listAPIKeysController.handle);
apiKeyRouter.delete('/delete/:id', deleteApiKeyController.handle)

export { apiKeyRouter };
