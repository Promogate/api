import { ISignInRepo } from "@/data/contracts";
import { ISignIn } from "@/domain/features";
import { TOKEN_SECRET } from "@/main/config";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { ErrorHandler, HttpStatusCode } from "../utils";

export class SignInService implements ISignIn {
  constructor(
    private readonly authenticationRepo: ISignInRepo
  ) { }

  async execute(input: ISignIn.Input): Promise<ISignIn.Output> {
    try {
      const user = await this.authenticationRepo.signIn(input);
      const passwordMatch = await compare(input.password, user.password);
      if (!passwordMatch) throw new ErrorHandler({
        statusCode: HttpStatusCode.FORBIDDEN,
        name: "AuthenticationError",
        message: "Usuário ou senha estão incorretos. Verifique e tente novamente"
      });
      const token = sign({ id: user.id, role: user.user_profile?.role }, TOKEN_SECRET, { expiresIn: "1d" });
  
      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.created_at,
          user_profile: user.user_profile,
          agree_with_policies: user.agree_with_policies
        }
      };
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: HttpStatusCode.FORBIDDEN,
        name: "AuthenticationError",
        message: "Usuário ou senha estão incorretos. Verifique e tente novamente"
      });
    }
  }
}