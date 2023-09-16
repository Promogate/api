import { GetCache, SetCache } from "@/domain/features";
import { redis } from "@/infra/lib";

export class CacheService implements SetCache, GetCache {
  EXPIRES_IN_A_MONTH = 2678400;

  async set(input: SetCache.input): Promise<void> {
    const content = JSON.stringify(input.content);
    await redis.set(input.cacheKey, content, "EX", this.EXPIRES_IN_A_MONTH);
  }

  async get(input: GetCache.input): Promise<GetCache.output>   {
    const cachedStringContent = await redis.get(input.cacheKey);
    if (!cachedStringContent) {
      return;
    }
    const result = JSON.parse(cachedStringContent);
    return result;
  }
}