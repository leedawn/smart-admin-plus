/**
 *  @name 深拷贝。包括基本类型，数组，对象，循环引用
 *  TODO: 测试循环引用
 */
export function deepClone<T = any>(source: T, cache: WeakMap<object, T> = new WeakMap()) {
  const isObject = (v: T) => typeof v === "object" && v !== null;
  if (!isObject(source)) return source;
  const res = cache.has(source as object);
  if (res) {
    return cache.get(source as object);
  }
  let target: Record<string, unknown> | string[] = Array.isArray(source) ? [] : {};
  cache.set(source as object, target as any);

  for (let key in source) {
    if ((source as object).hasOwnProperty(key)) {
      //   @ts-ignore
      target[key] = deepClone(source[key], cache);
    }
  }
  return target;
}
