import {
  createProfileController,
  createSessionController,
  createUserController,
  findUserByEmailController,
  findUserByIdController,
  getUserWithTokenController
} from '@/application/controllers';
import { verifyToken } from '@/application/middlewares';
import { Router } from 'express';

const userRouter = Router()

userRouter.post('/signin', createSessionController.handle);
userRouter.post('/signup', createUserController.handle);
userRouter.post('/profile/create/:id', createProfileController.handle);

userRouter.use(verifyToken);
userRouter.get('/me', getUserWithTokenController.handle);
userRouter.get('/',findUserByEmailController.handle);
userRouter.get('/:id',findUserByIdController.handle);

export { userRouter };
