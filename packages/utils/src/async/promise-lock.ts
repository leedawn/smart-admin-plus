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
  options?: PromiseLockOptions | KeyGenerator
): any {
  if (!options) {
    return function (proto: any, name: string, descriptor: any) {
      console.log("🚀 ~ file: promise-lock.ts:18 ~ proto:", proto, name);
      descriptor.value = promiseLock(descriptor.value, fn);
    };
  }
  if (typeof options === "function")
    return promiseLock(fn, { keyGenerator: options });
  let map = new Map();
  function promiseFn(...args: any[]) {
    const key = (options as PromiseLockOptions).keyGenerator();
    if (!map.has(key)) {
      let promise = fn();
      map.set(key, promise);
      if (!(options as PromiseLockOptions).forever) {
        const releaseCache = function () {
          map.has(key) && map.delete(key);
        };
        //  这里使用 finally 不行，它不会在当前事件循环中执行。
        promise
          .then((result: unknown) => {
            promise = result;
            releaseCache();
          })
          .catch((err: unknown) => {
            promise = Promise.reject(err);
            releaseCache();
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
