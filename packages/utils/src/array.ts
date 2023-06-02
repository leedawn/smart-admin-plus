export function ensureArray(value: null | undefined): [];
export function ensureArray<T>(value: T[]): T[];
export function ensureArray(value: unknown): unknown[] {
  if (value == null) {
    return [];
  } else if (Array.isArray(value)) return value;
  return [value];
}
