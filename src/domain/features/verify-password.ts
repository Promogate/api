export interface VerifyPassword {
    execute(input: VerifyPassword.Input): Promise<VerifyPassword.Output>
}

export namespace VerifyPassword {
    export type Input = {
        password: string
        encryptedPassword: string
    }

    export type Output = boolean
} 