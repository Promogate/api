import * as dotenv from "dotenv";
dotenv.config();

import "../config/module-alias";

import "express-async-errors";

import cors from "cors";
import express from "express";

import {
  analyticsRouter,
  apiKeyRouter,
  authenticationRouter,
  dashboardRouter,
  paymentRouter,
  resourcesRouter,
  uploadRouter,
  userRouter
} from "@/infra/routers";

import { errorHandler } from "@/main/utils";
import { socialsoulRouter } from "@/modules/social-soul/infra/router";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.use(authenticationRouter);
app.use("/payment", paymentRouter);
app.use("/resources", resourcesRouter);
app.use("/dashboard", dashboardRouter);
app.use("/analytics", analyticsRouter);
app.use("/users", userRouter);
app.use("/api-keys", apiKeyRouter);
app.use("/social-soul", socialsoulRouter);
app.use("/upload", uploadRouter);
app.use(errorHandler);


app.listen(PORT, () => console.log("Server is running!"));