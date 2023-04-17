import {
  createSessionController,
  createUserController,
  findUserByIdController
} from '@/application/controllers';
import { findUserByEmailController } from '@/application/controllers/find-user-by-email';
import { verifyToken } from '@/application/middlewares';
import { Router } from 'express';

const userRouter = Router()

userRouter.post('/create', createUserController.handle);
userRouter.get('/', verifyToken,findUserByEmailController.handle);
userRouter.get('/:id', verifyToken,findUserByIdController.handle);
userRouter.post('/signin', createSessionController.handle);

export { userRouter };
