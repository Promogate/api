import { ErrorHandler } from "@/application/utils";
import { Group } from "@/domain/@types";
import { CreateRedirector } from "@/domain/features/create-redirector";
import { MockProxy, mock } from "jest-mock-extended";

export interface CreateRedirectorRepository {
  create(input: CreateRedirectorRepository.Input): Promise<void | ErrorHandler>
}

export namespace CreateRedirectorRepository {
  export type Input = {
    title: string;
    description?: string;
    groups?: Group[]
  }
}

export class CreateRedirectorService implements CreateRedirector {
  constructor(readonly redirectorRepository: CreateRedirectorRepository) { }

  async execute(input: CreateRedirector.Input): Promise<CreateRedirector.Output> {
    await this.redirectorRepository.create(input);
  }
}

describe("CreateRedirector", function () {
  let redirectorRepository: MockProxy<CreateRedirectorRepository>;
  let sut: CreateRedirectorService;
  const input: CreateRedirector.Input = {
    title: "any_title",
    description: "any_description",
    groups: []
  };

  beforeEach(() => {
    redirectorRepository = mock();
    sut = new CreateRedirectorService(redirectorRepository);
  });

  it("should create Redirector with correct params", async function () {
    await sut.execute(input);
    expect(redirectorRepository.create).toHaveBeenCalledWith({
      title: "any_title",
      description: "any_description",
      groups: []
    });
  });
});