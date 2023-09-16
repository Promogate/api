import { IGetUserWithToken } from "@/domain/features";
import { TOKEN_SECRET } from "@/main/config";
import { verify } from "jsonwebtoken";

export class GetUserWithTokenService implements IGetUserWithToken {
  async execute(input: IGetUserWithToken.Input): Promise<IGetUserWithToken.Output> {
    const { id } = verify(input.token, TOKEN_SECRET) as { id: string };
    return {
      id
    };
  }

}