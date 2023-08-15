/**
 * @name 防抖
 */
export function debounce(fn: Function, delay: number) {
  let timer: NodeJS.Timeout;
  return function (this: any, ...args: unknown[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * @name 节流
 */
export function throttle(fn: Function, delay: number) {
  let prev = Date.now();
  return function (this: any, ...args: unknown[]) {
    const current = Date.now();
    if (current - prev < delay) return;
    fn.apply(this, args);
    prev = current;
  };
}

/**
 * @name 组合函数。右结合
 */

export function compose(...fns: Function[]) {
  if (!fns.length) return (v: unknown) => v;
  return fns.reduce((prev, cur) => {
    return (...args: unknown[]) => prev(cur(...args));
  });
}
