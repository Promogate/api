import { FindUserByEmailRepository } from "@/data/contracts";
import { FindUserByEmail } from "@/domain/features";

export class FindUserByEmailService implements FindUserByEmail {
  constructor(
    private readonly userRepository: FindUserByEmailRepository
  ) { }

  async execute(input: FindUserByEmail.Input): Promise<FindUserByEmail.Output> {
    const user = await this.userRepository.findByEmail(input);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: user.created_at,
      agree_with_policies: user.agree_with_policies
    };
  }

}
