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

export const compose =
  (...fns: Function[]) =>
  (val: unknown) =>
    fns.reverse().reduce((acc, fn) => fn(acc), val);

/**
 *
 * @name 管道函数。左结合
 */
export const pipe =
  (...fns: Function[]) =>
  (val: unknown) =>
    fns.reduce((acc, fn) => fn(acc), val);

// @ts-ignore
Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  const fn = Symbol();
  context[fn] = this;
  const res = context[fn](...args);
  delete context[fn];
  return res;
};
// @ts-ignore
Function.prototype.myApply = function (context, args) {
  context = context || window;
  const fn = Symbol();
  context[fn] = this;
  const res = context[fn](...args);
  delete context[fn];
  return res;
};
// @ts-ignore
Function.prototype.myBind = function (context, ...args) {
  const _this = this;
  return function F(this: any) {
    if (this instanceof F) {
      // @ts-ignore
      return new _this(...args, ...Array.from(arguments));
    }
    return _this.apply(context, args.concat(Array.from(arguments)));
  };
};

function test(a: unknown, b: unknown) {
  // @ts-ignore
  console.log(this.name, a, b);
}
const obj = {
  name: "leon",
};
// @ts-ignore
// test.myCall(obj, 23, 4);
// @ts-ignore
// test.myApply(obj, [23, 4]);
const fn = test.bind(obj, 3);
//@ts-ignore
new fn(4);
