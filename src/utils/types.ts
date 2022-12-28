type Values<T extends Record<string, unknown>> = T[keyof T]

type Tuplize<T extends Record<string, unknown>[]> = Pick<
  T,
  Exclude<keyof T, Extract<keyof Record<string, unknown>[], string> | number>
>

type _OneOf<T extends Record<string, unknown>> = Values<{
  [K in keyof T]: T[K] & {
    [M in Values<{ [L in keyof Omit<T, K>]: keyof T[L] }>]?: undefined
  }
}>

export type OneOf<T extends Record<string, unknown>[]> = _OneOf<Tuplize<T>>
