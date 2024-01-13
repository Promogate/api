export interface UpdateShortlinkDestinationLink {
  execute(input: UpdateShortlinkDestinationLink.Input): Promise<UpdateShortlinkDestinationLink.Ouput>
}

export namespace UpdateShortlinkDestinationLink {
  export type Input = {
    destinationLink: string;
    offerId: string;
  }
  export type Ouput = {
    id: string;
    code: string;
    short_link: string;
    destination_link: string;
    full_link: string;
    resource_id: string;
    offer_id: string;
    store_name: string;
  }
}