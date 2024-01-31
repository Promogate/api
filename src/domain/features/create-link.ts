export interface CreateLink {
  execute(input: CreateLink.Input): Promise<CreateLink.Output>
}

export namespace CreateLink {
  export type Input = {
    destinationLink: string;
    title: string;
    shortlink: string;
    type: string;
    image: string;
    clicks: number;
    utm: {
      source: string;
      medium: string;
      campaignName: string;
      term: string;
      content: string;
    },
    pixels: string[];
    brand: string;
    groupId: string;
    linkName: string;
  };
  export type Output = {
    id: string;
    destinationLink: string;
    title: string;
    shortlink: string;
    type: string;
    image: string;
    clicks: number;
    utm: string;
    pixels: string;
    brand: string;
    groupId: string;
    linkName: string;
  }
}
