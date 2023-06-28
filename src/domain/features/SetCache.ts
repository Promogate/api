export interface SetCache {
  set(input: SetCache.input): Promise<SetCache.output>
}

export namespace SetCache {
  export type input = {
    cacheKey: string;
    content: Record<string, unknown>;
  }

  export type output = void
}