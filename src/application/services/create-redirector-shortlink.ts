import { CreateRedirectorShortlink } from "@/domain/features";
import { pgateClient } from "@/main/config";

export class CreateRedirectorShortlinkService implements CreateRedirectorShortlink {
  async execute(input: CreateRedirectorShortlink.Input): Promise<CreateRedirectorShortlink.Output> {
    const { data } = await pgateClient.post("/create/redirector", input);
    return data.data;
  }
}           