import '../config/module-alias';

import 'express-async-errors';
import 'reflect-metadata';

import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import { userRouter } from '@/infra/routers';
import { errorHandler } from '@/main/utils';

const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use(errorHandler)


app.listen(5000, () => console.log('Server is running on port: 5000'));