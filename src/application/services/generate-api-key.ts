import { GenerateApiKey } from "@/domain/features";
import { generateApiKey } from "../utils";

export class GenerateApiKeyService implements GenerateApiKey {
  apiKey: string;
  
  constructor() {
    this.apiKey = generateApiKey();
  }

  execute(): string {
    return this.apiKey;
  }

  getApiKey(): string {
    return this.apiKey;
  }
}
