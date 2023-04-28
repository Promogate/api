interface ICSVFile {
  name: string;
  data: Buffer;
}

export interface ConvertCSVToJSON {
  execute(input: ConvertCSVToJSON.Input): Promise<ConvertCSVToJSON.Output>;
}

export namespace ConvertCSVToJSON {
  export type Input = {
    csv: ICSVFile
  }

  export type Output = unknown[]
}