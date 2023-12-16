import { CreateRedirectorService } from "@/application/services";
import { ErrorHandler, HttpStatusCode } from "@/application/utils";
import { CreateRedirectorRepository } from "@/data/contracts";
import { CreateRedirector } from "@/domain/features/create-redirector";
import { MockProxy, mock } from "jest-mock-extended";

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

  it("should create a redirector with correct params", async function () {
    await sut.execute(input);
    expect(redirectorRepository.create).toHaveBeenCalledWith({
      title: "any_title",
      description: "any_description",
      groups: []
    });
  });

  it("should not to throw or return any value", async function () {
    await expect(sut.execute(input)).resolves.not.toThrow();
  });

  it("should throw an error if service do not work", async function () {
    redirectorRepository.create.mockRejectedValue(new ErrorHandler({ message: "any_message", name: "any_name", statusCode: HttpStatusCode.INTERNAL_SERVER }));
    await expect(sut.execute(input)).rejects.toThrow(ErrorHandler);
  });
});