import { verifyAPIKey } from '@/application/middlewares';
import { Router } from 'express';

const resourceRouter = Router();

resourceRouter.post('/offer/create', verifyAPIKey)

export { resourceRouter };
