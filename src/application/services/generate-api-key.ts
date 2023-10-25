import { GenerateApiKey } from "@/domain/features";
import uuidAPIKey from "uuid-apikey";

export class GenerateApiKeyService implements GenerateApiKey {
  apiKey: string;
  
  constructor() {
    this.apiKey = this.generateKey();
  }

  execute(): string {
    return this.apiKey;
  }

  private generateKey() {
    const { apiKey: key } = uuidAPIKey.create();
    const apiKey = key.replace(/[-]/g, "");
    return apiKey;
  }

  getApiKey(): string {
    return this.apiKey;
  }
}
