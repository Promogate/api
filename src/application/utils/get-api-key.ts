import { Request } from "express";

export function getAPIKey (request: Request): string {
  const { "x-api-key": apiKey } = request.headers as { "x-api-key": string };
  return apiKey;
}