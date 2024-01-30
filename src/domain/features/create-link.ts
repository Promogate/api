export interface CreateLink {
  execute(input: CreateLink.Input): Promise<CreateLink.Output>
}

export namespace CreateLink {
  export type Input = {
    destinationLink: string | string[];
    title: string;
    clicks: number;
    shortlink: string;
    type: string;
    image?: string;
    utm?: string;
    pixels?: string;
    brand?: string;
    groupId?: string;
    linkName?: string;
  };
  export type Output = void;
}
