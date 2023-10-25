import { SaveUserRepository } from "@/data/contracts";
import { CreateUserError } from "@/domain/error";
import { CreateUser } from "@/domain/features";

export class CreateUserUseCase implements CreateUser {
  constructor(private readonly userRepository: SaveUserRepository) { }

  async execute(input: CreateUser.Input): Promise<CreateUserError> {
    await this.userRepository.save(input);
    return new CreateUserError();
  }
}