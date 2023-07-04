export const delay = (time: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

type KeyGenerator = () => string;
type traceFn = (...args: string[]) => string;

interface PromiseLockOptions {
  keyGenerator: KeyGenerator;
  trace?: traceFn;
  forever?: boolean;
}

const refreshSymbol = Symbol("refresh");

export function promiseLock(
  fn: any,
  options: PromiseLockOptions | KeyGenerator
): () => Promise<void> {
  if (typeof options === "function")
    return promiseLock(fn, { keyGenerator: options });
  let map = new Map();
  function promiseFn(...args: any[]) {
    const key = (options as PromiseLockOptions).keyGenerator();
    if (!map.has(key)) {
      let promise = fn();
      map.set(key, promise);
      if (!(options as PromiseLockOptions).forever) {
        promise
          .then((result: unknown) => {
            promise = result;
          })
          .catch((err: unknown) => {
            promise = Promise.reject(err);
          })
          .finally(() => {
            map.has(key) && map.delete(key);
          });
      }
      return promise;
    } else {
      const value = map.get(key);
      if ((options as PromiseLockOptions).trace) {
        ((options as PromiseLockOptions).trace as traceFn)(value, ...args);
      }
      return value;
    }
  }
  Object.defineProperty(promiseFn, refreshSymbol, {
    value: () => map.clear(),
  });
  return promiseFn;
}

export function refreshPromiseLock(fn: any) {
  if (!fn.hasOwnProperty(refreshSymbol)) return false;
  fn[refreshSymbol]();
  return true;
}
