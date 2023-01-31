export type Classes =
  | Record<string, any>
  | Array<string | Record<string, any>>
  | string;

export type ClassesDependencies = Array<
  boolean | string | number | bigint | null | undefined
>;
