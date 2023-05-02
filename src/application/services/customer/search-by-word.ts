import { ISearchByWord } from '@/domain/features';

export class SearchByWordService implements ISearchByWord {
  async execute(input: ISearchByWord.Input): Promise<ISearchByWord.Output> {
    throw new Error('Method not implemented.');
  }

}