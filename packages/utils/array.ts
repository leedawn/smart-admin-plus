export function ensureArray(source: any) {
  if (!source) return [];
  else if (Array.isArray(source)) return source;
  return [source];
}
