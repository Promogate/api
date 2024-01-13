export interface TokenIssuer {
    execute(input: TokenIssuer.Input): TokenIssuer.Output
}

export namespace TokenIssuer {
    export type Input = {
        id: string,
        role: string
    }

    export type Output = {
        token: string
    }
}
