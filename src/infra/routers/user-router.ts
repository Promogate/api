import {
  createProfileController,
  createSessionController,
  createUserController,
  findUserByIdController
} from '@/application/controllers';
import { verifyToken } from '@/application/middlewares';
import { Router } from 'express';

const userRouter = Router()

userRouter.post('/signin', createSessionController.handle);
userRouter.post('/signup', createUserController.handle);
userRouter.post('/:id/profile/create', createProfileController.handle);

userRouter.use(verifyToken);
userRouter.get('/me', findUserByIdController.handle);

export { userRouter };
