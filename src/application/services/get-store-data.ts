import { IGetStoreDataRepo } from "@/data/contracts";
import { GetStoreData } from "@/domain/features";

export class GetStoreDataService implements GetStoreData {
  constructor(
    private readonly resourcesRepository: IGetStoreDataRepo
  ) {}

  async execute(input: GetStoreData.Input): Promise<any> {
    const store = await this.resourcesRepository.getStore({ store_name: input.store_name });
    return store;
  }

}