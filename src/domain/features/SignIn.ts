export interface SignIn {
    execute(input: SignIn.Input): Promise<SignIn.Output>
  }
  
  export namespace SignIn {
    export type Input = {
      email: string
      password: string
    }
  
    export type Output = {
        token: string
    } | undefined
  }