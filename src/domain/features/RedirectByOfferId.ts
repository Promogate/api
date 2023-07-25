export interface RedirectByOfferId {
    execute(input: RedirectByOfferId.Input): Promise<RedirectByOfferId.Output>
}

export namespace RedirectByOfferId {
    export type Input = {
        id: string
    }
    export type Output = {
        destinationLink: string
    } | undefined
}