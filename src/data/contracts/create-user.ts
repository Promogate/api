export interface CreateUserRepository {
  create: (input: CreateUserRepository.Input) => Promise<CreateUserRepository.Ouput>
}

export namespace CreateUserRepository {
  export type Input = {
    name?: string
    email: string
    password: string
  }

  export type Ouput = {
    id: string
  }
}