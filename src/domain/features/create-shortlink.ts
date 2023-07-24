export interface CreateShortlink {
  execute(input: CreateShortlink.Input): Promise<CreateShortlink.Output>
}

export namespace CreateShortlink {
  export type Input = {
    fullLink: string;
    offerId: string;
    storeName: string;
    resourceId: string;
    destinationLink: string;
  }

  export type Output = {
    id: string;
    code: string;
    resourceId: string;
    offerId: string;
    storeName: string;
    fullLink: string;
    shortLink: string;
    createdAt: string;
  } | undefined
}