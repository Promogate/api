import { UpdateShortlinkDestinationLink } from '@/domain/features';
import { pgateClient } from '@/main/config';

export class UpdateShortlinkDestinationLinkService implements UpdateShortlinkDestinationLink {
  async execute(input: UpdateShortlinkDestinationLink.Input): Promise<UpdateShortlinkDestinationLink.Ouput> {
    const { data } = await pgateClient.put<
      UpdateShortlinkDestinationLink.Ouput
    >(`/api/update/${input.offerId}`, { destinationLink: input.destinationLink });
    return data
  }

}