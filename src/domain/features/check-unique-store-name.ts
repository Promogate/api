import { UserProfile } from '@prisma/client';

export interface CheckUniqueStoreName {
  execute(input: CheckUniqueStoreName.Input): Promise<CheckUniqueStoreName.Output>
}

export namespace CheckUniqueStoreName {
  export type Input = {
    storeName: string;
  }

  export type Output = undefined | UserProfile
}