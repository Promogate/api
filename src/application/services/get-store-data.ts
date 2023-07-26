import { IGetStoreDataRepo } from '@/data/contracts';
import { IGetStoreData } from '@/domain/features';

export class GetStoreDataService implements IGetStoreData {
  constructor(
    private readonly resourcesRepo: IGetStoreDataRepo
  ) {}

  async execute(input: IGetStoreData.Input): Promise<any> {
    const store = await this.resourcesRepo.getStore({ store_name: input.store_name });
    return store;
  }

}