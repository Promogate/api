export interface GetUserInfo {
    execute(input: GetUseInfo.Input): Promise<GetUseInfo.Output>
}

export namespace GetUseInfo {
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