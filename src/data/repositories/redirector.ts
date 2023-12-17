import { CreateRedirectorRepository } from "../contracts";

export class RedirectorRepository implements CreateRedirectorRepository {
  create(input: CreateRedirectorRepository.Input): Promise<CreateRedirectorRepository.Output> {
    throw new Error("Method not implemented.");
  }
  
}