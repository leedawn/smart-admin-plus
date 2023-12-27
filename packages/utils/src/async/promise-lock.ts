type KeyGenerator = () => string | ((arg0: string) => string);
type traceFn = (...args: string[]) => string;

interface PromiseLockOptions {
  keyGenerator: KeyGenerator;
  trace?: traceFn;
  forever?: boolean;
}

const refreshSymbol = Symbol("refresh");

export function promiseLock(fn: any, options?: PromiseLockOptions | KeyGenerator): any {
  if (!options) {
    return function (proto: any, name: string, descriptor: any) {
      console.log("🚀 ~ file: promise-lock.ts:18 ~ proto:", proto, name);
      descriptor.value = promiseLock(descriptor.value, fn);
    };
  }
  if (typeof options === "function") return promiseLock(fn, { keyGenerator: options });
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

// 简略版本。
// 1. map 里面保存 key 和 Promise
// 2. Promise 执行完后修改结果并且释放缓存
// function promiseLock(fn, key) {
//   let map = new Map();
//   function promiseFn() {
//     if (!map.has(key)) {
//       let p = fn();
//       map.set(key, p);
//       function releaseCache() {
//         map.has(key) && map.delete(key);
//       }
//       p.then((res) => {
//         p = res;
//         releaseCache();
//       }).catch((e) => {
//         p = Promise.reject(e);
//         releaseCache();
//       });
//       return p;
//     } else {
//       return map.get(key);
//     }
//   }
//   return promiseFn;
// }

/* function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  function print() {
    console.log("print");
  }
  function asyncPrint() {
    return delay().then(() => print());
  }
  const asyncLock = promiseLock(asyncPrint, "key");
  // Promise.all([asyncLock(), asyncLock(), asyncLock()]);
  Promise.all([asyncPrint(), asyncPrint()]); */
