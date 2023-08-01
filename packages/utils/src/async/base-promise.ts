// 参考方案：https://juejin.cn/post/6994594642280857630#heading-1
type PromiseState = "pending" | "fulfilled" | "rejected";
type FulfilledFn = (value: any) => any;
type RejectedFn = (reason: any) => any;

export class MyPromise {
  private state!: PromiseState;
  private result: unknown;
  private fulfilledCallbacks!: FulfilledFn[];
  private rejectedCallbacks!: RejectedFn[];
  constructor(executor: (resolve: FulfilledFn, reject: RejectedFn) => void) {
    this.initValue();
    this.initBind();
    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e as string); // 异常情况相当于 reject
    }
  }

  initValue() {
    this.state = "pending";
    this.result = null;
    this.fulfilledCallbacks = []; // 处理异步情况：数组+while 循环
    this.rejectedCallbacks = [];
  }

  initBind() {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }

  private resolve(value: string) {
    if (this.state !== "pending") return; // 状态一旦改变，就不会再变
    this.state = "fulfilled";
    this.result = value;
    while (this.fulfilledCallbacks.length) {
      const fn = this.fulfilledCallbacks.shift() as FulfilledFn;
      fn(this.result as string);
    }
  }

  private reject(reason: string) {
    if (this.state !== "pending") return;
    this.state = "rejected";
    this.result = reason;
    while (this.rejectedCallbacks.length) {
      const fn = this.rejectedCallbacks.shift() as RejectedFn;
      fn(this.result as string);
    }
  }

  public then(onFulfilled: FulfilledFn, onRejected?: RejectedFn | undefined) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (res) => res;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const thenPromise = new MyPromise((resolve, reject) => {
      const resolvePromise = (cb: FulfilledFn | RejectedFn) => {
        try {
          const x = cb(this.result as string);
          if (x === thenPromise) {
            // console.log("🚀 ~ file: base-promise.ts:66 ~ MyPromise ~ resolvePromise ~ x:", x, thenPromise);
            // throw new Error("不能调用自身");// 这行代码没有用
          }
          if (x instanceof MyPromise) {
            x.then(resolve, reject);
          } else {
            resolve(x);
          }
        } catch (err) {
          reject(err as string);
          throw new Error(err as string);
        }
      };

      if (this.state === "fulfilled") {
        // onFulfilled(this.result as string);  // 实现 then 的链式调用，去掉这行代码
        resolvePromise(onFulfilled);
      } else if (this.state === "rejected") {
        // onRejected(this.result as string);  // 实现 then 的链式调用，去掉这行代码
        resolvePromise(onRejected as RejectedFn);
      } else if (this.state === "pending") {
        this.fulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled));
        this.rejectedCallbacks.push(resolvePromise.bind(this, onRejected as RejectedFn));
      }
    });
    return thenPromise;
  }

  static all(...args: any[]) {
    return new MyPromise((resolve, reject) => {
      let res = [];
      args.map((p, index) => {
        console.log("🚀 ~ file: base-promise.ts:108 ~ MyPromise ~ args.map ~ p:", p.then);
        try {
          const result = p.then((data: any) => {
            res[index] = data;
            if (res.length === args.length) resolve(result);
          });
        } catch (e) {
          reject(e);
        }
      });
    });
  }
}
function fn(index: number, time: number) {
  return new MyPromise((resolve) => {
    setTimeout(resolve(index), time);
  });
}
async function myTest() {
  const res = await MyPromise.all([fn(1, 2000) as MyPromise, fn(2, 1000) as MyPromise]);
  console.log(res);
}
myTest();
