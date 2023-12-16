import { ErrorHandler } from "@/application/utils";
import { Group } from "@/domain/@types";

export interface CreateRedirectorRepository {
  create(input: CreateRedirectorRepository.Input): Promise<CreateRedirectorRepository.Output>
}

export namespace CreateRedirectorRepository {
  export type Input = {
    title: string;
    description?: string;
    groups?: Group[]
  }

  export type Output = void | ErrorHandler
}