import { FindUserByEmailIncludingPasswordRepository } from "@/data/contracts";
import { SignInError, UserNotFoundError } from "@/domain/error";
import { SignIn, TokenIssuer, VerifyPassword } from "@/domain/features";

export class SignInUseCase implements SignIn {
    constructor(
        private readonly userRepository: FindUserByEmailIncludingPasswordRepository,
        private readonly verifyPasswordUseCase: VerifyPassword,
        private readonly tokenIsserUseCase: TokenIssuer
      ) { }

    async execute(input: SignIn.Input): Promise<SignIn.Output> {
        const user = await this.userRepository.findByEmailIncludingPassword({ email: input.email });
        if(!user) throw new UserNotFoundError();
        if (!(await this.verifyPasswordUseCase.execute({ password: input.password, encryptedPassword: user.password }))) {
            throw new SignInError();
        }
        const { token } = this.tokenIsserUseCase.execute({ id: user.id, role: user.role });
        return {
            token
        };
    }
}
