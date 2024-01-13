import { CreateRedirectorRepository } from "@/data/contracts";
import { CreateRedirector } from "@/domain/features";

export class CreateRedirectorService implements CreateRedirector {
  constructor(readonly redirectorRepository: CreateRedirectorRepository) { }

  async execute(input: CreateRedirector.Input): Promise<CreateRedirector.Output> {
    await this.redirectorRepository.create(input);
  }
}
