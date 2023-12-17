import { ISignUpRepo } from "@/data/contracts";
import { CreateUser, Logging } from "@/domain/features";
import { TOKEN_SECRET } from "@/main/config";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { ErrorHandler, HttpStatusCode } from "../utils";

export class CreateUserService implements CreateUser {
  constructor(
    private readonly loggingService: Logging,
    private readonly authenticationRepository: ISignUpRepo
  ) { }

  async execute(input: CreateUser.Input): Promise<CreateUser.Output> {
    try {
      const hashedPassword = await hash(input.password, 10);
      const savedUser = await this.authenticationRepository.signUp({ ...input, password: hashedPassword, agree_with_policies: input.agreeWithPolicies });
      const token = sign({ id: savedUser.id, role: savedUser.user_profile?.role }, TOKEN_SECRET, { expiresIn: "1d" });
      this.loggingService.info(`A new user created with email: ${input.email}`);

      return {
        token,
        id: savedUser.id
      };
    } catch (error: any) {
      this.loggingService.error(error.stack);
      throw new ErrorHandler({
        statusCode: HttpStatusCode.INTERNAL_SERVER,
        name: "FailedToCreateUser",
        message: error.message
      });
    }
  }
}
