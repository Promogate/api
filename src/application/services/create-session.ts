import { FindUserByEmailIncludingPasswordRepository } from "@/data/contracts";
import { UserNotFoundError } from "@/domain/error";
import { CreateSession } from "@/domain/features";
import { TOKEN_SECRET } from "@/main/config";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { ErrorHandler, HttpStatusCode } from "../utils";

export class CreateSessionService implements CreateSession {
  constructor(
    private readonly userRepository: FindUserByEmailIncludingPasswordRepository,
  ) { }

  async execute(input: CreateSession.Input): Promise<CreateSession.Output> {
    const user = await this.userRepository.findByEmailIncludingPassword({ email: input.email });
    if (!user) throw new UserNotFoundError();
    const passwordMatch = await compare(input.password, user.password as string);
    if (!passwordMatch) {
      throw new ErrorHandler({
        statusCode: HttpStatusCode.FORBIDDEN,
        name: "AuthenticationError",
        message: "Usuário ou senha estão incorretos. Verifique e tente novamente"
      });
    }

    const token = sign({ id: user.id, role: user.role }, TOKEN_SECRET, { expiresIn: "1d" });

    return {
      token
    };
  }
}
