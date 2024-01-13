import { ErrorHandler } from "@/application/utils";

export interface RedirectorLink {
  execute(input: RedirectorLink.Input): Promise<RedirectorLink.Output>
}

export namespace RedirectorLink {
  export type Input = {
    redirectorId: string;
  }

  export type Output = string | null | ErrorHandler
}