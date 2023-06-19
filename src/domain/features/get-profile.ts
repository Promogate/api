/*eslint-disable @typescript-eslint/no-explicit-any*/

export interface IGetProfile {
  execute(input: IGetProfile.Input): Promise<IGetProfile.Ouput>
}

export namespace IGetProfile {
  export type Input = {
    id: string
  }

  export type Ouput = any
}