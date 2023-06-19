import { ISearchByWord } from '@/domain/features';

export class SearchByWordService implements ISearchByWord {
  async execute(input: ISearchByWord.Input): Promise<ISearchByWord.Output> {
    const data = input;
    throw new Error('Method not implemented.');
  }

}