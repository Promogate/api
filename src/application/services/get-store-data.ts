import { IGetStoreDataRepo } from '@/data/contracts';
import { IGetStoreData } from '@/domain/features';
import { inject, injectable } from 'tsyringe';

/*eslint-disable @typescript-eslint/no-explicit-any*/
@injectable()
export class GetStoreDataService implements IGetStoreData {
  constructor(
    @inject('ResourcesRepository')
    private readonly resourcesRepo: IGetStoreDataRepo
  ) {}

  async execute(input: IGetStoreData.Input): Promise<any> {
    const store = await this.resourcesRepo.getStore({ store_name: input.store_name });
    return store;
  }

}