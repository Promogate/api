export interface SetCache {
  set(input: SetCache.input): Promise<SetCache.output>
}

export namespace SetCache {
  export type input = {
    cacheKey: string;
  }

  export type output = void
}