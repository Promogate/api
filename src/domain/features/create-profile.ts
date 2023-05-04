export interface ICreateProfile {
  execute(input: ICreateProfile.Input): Promise<ICreateProfile.Output>
}

export namespace ICreateProfile {
  export type Input = {
    store_image: string;
    store_name: string;
    user: string;
  }

  export type Output = {
    profile: string
  }
}