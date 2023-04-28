export interface ICSVFile {
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

  export type Output = Array<{
    resources_id: string
    image: string
    title: string
    oldPrice?: string
    price: string
    destination_link: string
    store_image: string
    expiration_date: string
  }>
}