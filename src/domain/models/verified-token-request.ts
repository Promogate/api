import { Request } from "express";

export type VerifiedTokenRequest = Request & { 
  user?: string,
  role?: string
};
