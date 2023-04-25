import * as dotenv from 'dotenv';
dotenv.config();

import '../config/module-alias';

import 'express-async-errors';
import 'reflect-metadata';


import cors from 'cors';
import express from 'express';

import '../shared/containers';

import {
  analyticsRouter,
  apiKeyRouter,
  resourceRouter,
  userRouter
} from '@/infra/routers';
import { errorHandler } from '@/main/utils';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/api-keys', apiKeyRouter)
app.use('/resources', resourceRouter)
app.use('/analytics', analyticsRouter)
app.use(errorHandler)


app.listen(8080, () => console.log('Server is running on port: 8080'));