import { CreateShortlink } from "@/domain/features";
import { pgateClient } from "@/main/config";

export class CreateShortlinkService implements CreateShortlink {
  async execute(input: CreateShortlink.Input): Promise<CreateShortlink.Output> {
    const { data } = await pgateClient.post("/create", input);
    return data.data;
  }
}