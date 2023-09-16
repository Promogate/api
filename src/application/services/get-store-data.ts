import { IGetStoreDataRepo } from "@/data/contracts";
import { IGetStoreData } from "@/domain/features";

export class GetStoreDataService implements IGetStoreData {
  constructor(
    private readonly resourcesRepository: IGetStoreDataRepo
  ) {}

  async execute(input: IGetStoreData.Input): Promise<any> {
    const store = await this.resourcesRepository.getStore({ store_name: input.store_name });
    return store;
  }

}