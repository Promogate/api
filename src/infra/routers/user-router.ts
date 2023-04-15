import { createUserController } from '@/application/controllers';
import { Router } from 'express';

const userRouter = Router()

userRouter.post('/create', createUserController.handle)

export { userRouter };
