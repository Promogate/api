import { verifyAPIKey } from '@/application/middlewares';
import { Router } from 'express';

const resourceRouter = Router();

resourceRouter.get('/offer/create', verifyAPIKey)

export { resourceRouter };
