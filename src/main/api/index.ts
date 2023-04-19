import * as dotenv from 'dotenv';
dotenv.config();

import '../config/module-alias';

import 'express-async-errors';
import 'reflect-metadata';


import express from 'express';

import '../shared/containers';

import { apiKeyRouter, resourceRouter, userRouter } from '@/infra/routers';
import { errorHandler } from '@/main/utils';

const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/api-keys', apiKeyRouter)
app.use('/resources', resourceRouter)
app.use(errorHandler)


app.listen(5000, () => console.log('Server is running on port: 5000'));