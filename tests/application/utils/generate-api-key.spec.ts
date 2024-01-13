import { GenerateApiKeyService } from "@/application/services/generate-api-key";

describe("Api Key Suite", function () {
  let sut: GenerateApiKeyService;

  beforeEach(() => {
    sut = new GenerateApiKeyService();
  });

  test("ensure service creates a new api key", function() {
    const apiKey = sut.execute();
    const generatedApiKey = sut.getApiKey();

    expect(apiKey).toBe(generatedApiKey);
  });
});