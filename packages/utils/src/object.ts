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

// 1. object.create 仿写. 这个例子不确定效果
/* function create(obj: Object) {
  function fn() {}
  fn.prototype = obj;
  return new fn();
}

const person = {
  print() {
    console.log("my name is " + this.name);
  },
};

const p = create(person);
p.name = "leon";
p.print(); */

/**
 * @name new 仿写
 */
export function objectFactory(constructor: Function, ...args: unknown[]) {
  let newObject = null;
  newObject = Object.create(constructor.prototype);
  const result = constructor.apply(newObject, args);
  if (result && (typeof result === "object" || typeof result === "function")) {
    return result;
  } else {
    return newObject;
  }
}

export function myInstanceOf(left: object, right: Function) {
  const proto = right.prototype;

  while (true) {
    left = Object.getPrototypeOf(left);
    if (left === proto) return true;
    if (!left) return false;
  }
}
