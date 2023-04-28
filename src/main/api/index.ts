import * as dotenv from 'dotenv';
dotenv.config();

import '../config/module-alias';

import 'express-async-errors';
import 'reflect-metadata';


import cors from 'cors';
import express from 'express';

import '../shared/containers';

import {
  apiKeyRouter,
  resourceRouter,
  testingRoute,
  userRouter
} from '@/infra/routers';
import {
  analyticsRouter,
  dashboardResourceRouter
} from '@/infra/routers/dashboard';
import { errorHandler } from '@/main/utils';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/testing', testingRoute)

app.use('/dashboard', dashboardResourceRouter)
app.use('/dashboard/analytics', analyticsRouter)

app.use('/users', userRouter);
app.use('/api-keys', apiKeyRouter)
app.use('/resources', resourceRouter)
app.use(errorHandler)


app.listen(8080, () => console.log('Server is running on port: 8080'));