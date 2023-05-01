import {
  createSessionController,
  createUserController,
  findUserByIdController
} from '@/application/controllers';
import { findUserByEmailController } from '@/application/controllers/find-user-by-email';
import { verifyToken } from '@/application/middlewares';
import { Router } from 'express';

const userRouter = Router()

userRouter.post('/signin', createSessionController.handle);
userRouter.post('/create', createUserController.handle);

userRouter.use(verifyToken)
userRouter.get('/me')
userRouter.get('/',findUserByEmailController.handle);
userRouter.get('/:id',findUserByIdController.handle);

export { userRouter };
