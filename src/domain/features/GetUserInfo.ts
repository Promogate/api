export interface GetUserInfo {
    execute(input: GetUserInfo.Input): Promise<GetUserInfo.Output>
}

export namespace GetUserInfo {
    export type Input = {
        userId: string
    }
    export type Output = {
        id: string,
        name: string,
        email: string,
        userProfile: {
            storeImage: string,
            storeName: string,
            storeNameDisplay: string,
        }
    }
}