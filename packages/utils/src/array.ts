/* export function ensureArray(value: null | undefined): [];
export function ensureArray<T>(value: T[] | T): T[];
export function ensureArray(value: unknown): unknown[] {
  if (value == null) {
    return [];
  } else if (Array.isArray(value)) return value;
  return [value];
}
 */

type Nullable<T> = T | null | undefined;
type Arrayable<T> = T | T[];

export function ensureArray<T>(input?: Nullable<Arrayable<T>>): T[] {
  input = input ?? [];
  return Array.isArray(input) ? input : [input];
}
