export interface GetCache {
  get(input: GetCache.input): Promise<GetCache.output>
}

export namespace GetCache {
  export type input = {
    cacheKey: string;
  }

  export type output = Record<string, unknown>;
}