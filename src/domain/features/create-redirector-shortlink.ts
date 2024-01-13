export interface CreateRedirectorShortlink {
  execute(input: CreateRedirectorShortlink.Input): Promise<CreateRedirectorShortlink.Output>
}

export namespace CreateRedirectorShortlink {
  export type Input = {
    redirectorId: string
    destinationLink: string;
    type: string;
  }

  export type Output = {
    id: string;
    code: string;
    shortLink: string;
    destinationLink: string;
  } | undefined
}