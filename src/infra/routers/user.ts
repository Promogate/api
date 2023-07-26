import {
  createProfileController,
  createSessionController,
  createUserController,
  meCategoriesController,
  meController,
  updateProfileController
} from '@/application/controllers';
import { verifyToken } from '@/application/middlewares';
import { Router } from 'express';

/*eslint-disable @typescript-eslint/no-explicit-any*/
const userRouter = Router()

userRouter.post('/signin', createSessionController.handle);

userRouter.post('/signup', async (req, res) => await createUserController.handle(req, res));

userRouter.use(verifyToken);

userRouter.post('/:id/profile/create', createProfileController.handle);

userRouter.put('/profile/:id/update', updateProfileController.handle);

userRouter.get('/me', meController.handle);

userRouter.get('/me/categories', meCategoriesController.handle);

export { userRouter };
