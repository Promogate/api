import { signInController } from '@/application/controllers';
import { Router } from 'express';

const authenticationRouter = Router();

authenticationRouter.post('/signin', signInController.handle);

export { authenticationRouter };
