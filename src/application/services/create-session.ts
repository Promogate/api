import { FindUserByEmailIncludingPasswordRepository } from "@/data/contracts";
import { AuthenticationFailed, UserNotFoundError } from "@/domain/error";
import { CreateSession } from "@/domain/features";
import { TOKEN_SECRET } from "@/main/config";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export class CreateSessionService implements CreateSession {
  constructor(
    private readonly userRepository: FindUserByEmailIncludingPasswordRepository,
  ) { }

  async execute(input: CreateSession.Input): Promise<CreateSession.Output> {
    const user = await this.userRepository.findByEmailIncludingPassword({ email: input.email });
    if(!user) throw new UserNotFoundError();
    const passwordMatch = await compare(input.password, user.password as string);
    if (!passwordMatch) {
      throw new AuthenticationFailed();
    }

    const token = sign({ id: user.id, role: user.role }, TOKEN_SECRET, { expiresIn: "1d" });

    return {
      token
    };
  }
}
