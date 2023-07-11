import { delay, promiseLock } from ".";

// interface PromiseConcatOptions {
//   keyGenerator?: () => string;
//   duration?: number | ((time: number) => Promise<void>);
// }

class ArgManager {
  private map = new Map();
  public insert(key: string, arg: string) {
    if (!this.map.has(key)) this.map.set(key, []);
    const arr = this.map.get(key);
    arr.push(arg);
    return arr.length - 1;
  }
  public use(key: string) {
    const arr = this.map.get(key);
    this.map.delete(key);
    return arr;
  }
}

/* export function promiseConcat(fn: Function, options?: PromiseConcatOptions) {
  options = options || {};
  const keyGenerator =
    "keyGenerator" in options ? options.keyGenerator : () => "duration";
  const duration = () =>
    delay(typeof options?.duration === "number" ? options.duration : 16);

  const lockedDurationFn = promiseLock(
    (_key: string | number) =>
      Promise.resolve(duration()).then(() =>
        promiseLock(
          (context: object, args: any[]) =>
            Promise.resolve(fn.call(context, args)),
          () => "fn"
        )
      ),
    {
      keyGenerator: () => "string",
    }
  );
  const argManager = new ArgManager();

  return function (this: object, arg: any) {
    const key = keyGenerator?.call(this);
    const index = argManager.insert(key as string, arg);
    return lockedDurationFn(key)
      .then((lockedFn: any) => lockedFn(this, argManager.use(key as string)))
      .then((result: any) => result[index]);
  };
}
 */

function normalizePromiseConcatOptions(options: any) {
  return typeof options === "number" ? { duration: options } : options;
}

export default function promiseConcat(fn: any, options: any) {
  if (fn && typeof fn === "function") {
    return createPromiseConcatFunction(
      fn,
      normalizePromiseConcatOptions(options)
    );
    // } else {
    //   const options = normalizePromiseConcatOptions(fn);
    //   return createMethodDecorator(
    //     (fn) => promiseConcat(fn, options),
    //     options?.global
    //   );
  }
}
function createPromiseConcatFunction(fn: any, options: any): any {
  const { duration, keyGenerator = () => "duration" } = options || {};
  if (!duration || typeof duration === "number") {
    return createPromiseConcatFunction(fn, {
      ...options,
      duration: duration ? () => delay(duration) : delay(16),
    });
  }
  const lockedDurationFn = promiseLock(
    (_key: any) =>
      Promise.resolve(duration()).then(() =>
        promiseLock(
          (context: any, args: any) => Promise.resolve(fn.call(context, args)),
          () => "fn"
        )
      ),
    // { keyGenerator: (key) => key }
    { keyGenerator: () => "key" }
  );
  const argManager = new ArgManager();
  function promiseConcat1(this: object, arg: any): any {
    if (Array.isArray(arg)) {
      return Promise.all(arg.map((item) => promiseConcat1.call(this, item)));
    }
    const key = keyGenerator.call(this as any, arg);
    const index = argManager.insert(key, arg);
    return lockedDurationFn(key)
      .then((lockedFn: any) => lockedFn(this, argManager.use(key)))
      .then((result: any) => result[index]);
  }
  return promiseConcat1 as Function;
}
