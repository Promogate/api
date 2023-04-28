import { ConvertCSVToJSON } from '@/domain/features';
import csvtojson from 'csvtojson';

export class ConvertCSVToJSONService implements ConvertCSVToJSON {
  async execute(input: ConvertCSVToJSON.Input): Promise<ConvertCSVToJSON.Output> {
    const json = await csvtojson().fromString(input.csv.data.toString());
    return json
  }
}