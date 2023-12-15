import { Group } from "../@types";

export interface CreateRedirector {
  execute(): Promise<void>
}

export namespace CreateRedirector {
  export type Input = {
    title: string;
    descriptiont?: string;
    groupos?: Group[]
  }
}
