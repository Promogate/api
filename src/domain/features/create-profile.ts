export interface CreateProfile {
  execute(input: CreateProfile.Input): Promise<CreateProfile.Output>
}

export namespace CreateProfile {
  export type Input = {
    storeImage: string; 
    storeName: string;
    storeNameDisplay: string;
    userId: string;
  }

  export type Output = {
    profileId: string
  }
}