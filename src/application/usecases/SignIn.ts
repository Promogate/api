import { FindUserByEmailIncludingPasswordRepository } from "@/data/contracts";
import { SignInError, UserNotFoundError } from "@/domain/error";
import { SignIn, VerifyPassword } from "@/domain/features";
import { TOKEN_SECRET } from "@/main/config";
import { sign } from "jsonwebtoken";

export class SignInUseCase implements SignIn {
    constructor(
        private readonly userRepository: FindUserByEmailIncludingPasswordRepository,
        private readonly verifyPasswordUseCase: VerifyPassword
      ) { }

    async execute(input: SignIn.Input): Promise<SignIn.Output> {
        const user = await this.userRepository.findByEmailIncludingPassword({ email: input.email })
        if(!user) throw new UserNotFoundError()
        if (!(await this.verifyPasswordUseCase.execute({ password: input.password, encryptedPassword: user.password }))) {
            throw new SignInError()
        }
        const token = sign({ id: user.id, role: user.role }, TOKEN_SECRET, { expiresIn: '1d' });
        return {
            token
        }
    }
}
