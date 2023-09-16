import { CreateUserUseCase } from "@/application/usecases";
import { SaveUserRepository } from "@/data/contracts";
import { CreateUserError } from "@/domain/error";
import { mock, MockProxy } from "jest-mock-extended";

describe("CreateUserUseCase", () => {
  let repository: MockProxy<SaveUserRepository>;
  let sut: CreateUserUseCase;
  const input = { name: "any_name", email: "any_email", password: "any_pass", agreeWithPolicies: true };

  beforeEach(() => {
    repository = mock();
    repository.save.mockResolvedValue({ id: "any_id" });
    sut = new CreateUserUseCase(repository);
  });

  test("it should call SaveUserRepository with correct params", async () => {
    await sut.execute(input);
    expect(repository.save).toHaveBeenCalledWith({
      name: "any_name",
      email: "any_email",
      password: "any_pass",
      agreeWithPolicies: true,
    });
    expect(repository.save).toHaveBeenCalledTimes(1);
  });

  test("it should CreateUserUseCase throws CreateUserError", async () => {
    const result = await sut.execute(input);
    expect(result).toEqual(new CreateUserError);
  });
});

export { };
