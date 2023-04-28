import { ConvertCSVToJSON } from '@/domain/features';
import csvtojson from 'csvtojson';
import { injectable } from 'tsyringe';

@injectable()
export class ConvertCSVToJSONService implements ConvertCSVToJSON {
  async execute(input: ConvertCSVToJSON.Input): Promise<ConvertCSVToJSON.Output> {
    const string = input.csv.data.toString()
    const json = await csvtojson().fromString(string);
    return json
  }
}