import { createUserController } from '@/application/controllers';
import { findUserByEmailController } from '@/application/controllers/find-user-by-email';
import { Router } from 'express';

const userRouter = Router()

userRouter.post('/create', createUserController.handle);
userRouter.get('/', findUserByEmailController.handle);

export { userRouter };
