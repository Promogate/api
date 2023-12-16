import { ErrorHandler } from "@/application/utils";
import { Group } from "../@types";

export interface CreateRedirector {
  execute(input: CreateRedirector.Input): Promise<CreateRedirector.Output>
}

export namespace CreateRedirector {
  export type Input = {
    title: string;
    description?: string;
    groups?: Group[]
  }
  export type Output = void | ErrorHandler
}