import { createUserController, findUserByIdController } from '@/application/controllers';
import { findUserByEmailController } from '@/application/controllers/find-user-by-email';
import { Router } from 'express';

const userRouter = Router()

userRouter.post('/create', createUserController.handle);
userRouter.get('/', findUserByEmailController.handle);
userRouter.get('/:id', findUserByIdController.handle);

export { userRouter };
