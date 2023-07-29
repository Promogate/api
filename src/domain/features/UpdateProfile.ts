export interface UpdateProfile {
    execute(input: UpdateProfile.Input): Promise<UpdateProfile.Output>
}

export namespace UpdateProfile {
    export type Input = {
        profileId: string
        name?: string;
        storeImage?: string;
        storeName?: string;
        storeNameDisplay?: string;
        facebook?: string;
        instagram?: string;
        whatsapp?: string;
        telegram?: string;
        twitter?: string;
        lomadeeSourceId?: string;
    }
    export type Output = void
}
