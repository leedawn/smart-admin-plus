import { MyPromise } from "../src/async/base-promise";

describe("基础调用", () => {
  test("基础", () => {
    const res = "success";
    const p = new MyPromise((resolve) => {
      resolve(res);
    });
    p.then(
      (data) => {
        console.log("🚀 ~ file: base-promise.test.ts:11 ~ test ~ data:", 1); // TODO：需要更好的异步任务测试方案
        expect(data).toEqual(res);
      },
      () => {}
    );
    console.log("🚀 ~ file: base-promise.test.ts:11 ~ test ~ data:", 2);
  });

  test("定时器调用", (done) => {
    const res = "fail";
    const p = new MyPromise((_, reject) => {
      setTimeout(() => {
        reject(res);
      }, 1000);
    });
    p.then(
      () => {},
      (err) => {
        expect(err).toEqual(res);
        done(); // 异步断言需要增加 done
      }
    );
  });
});

describe("then 调用", () => {
  test("resolve 状态", () => {
    // 链式调用 输出 200
    new MyPromise((resolve) => {
      resolve(100);
    })
      .then(
        (res) => {
          expect(res).toEqual(100);
          return 2 * (res as number);
        },
        () => {}
      )
      .then(
        (res) => {
          expect(res).toEqual(200);
        },
        () => {}
      );
  });
  test("reject 状态", () => {
    const num = 10;
    // 链式调用 输出 200
    return new MyPromise(() => {
      throw num;
    })
      .then(() => {})
      .then(
        () => {},
        (err) => {
          expect(err).toEqual(num);
        }
      );
  });
});

describe("then 调用的时候返回 promise", () => {
  test("succes", () => {
    const p = new MyPromise((resolve) => {
      resolve(100);
    });
    return p
      .then(
        (data) => new MyPromise((_, reject) => reject(data * 2)),
        () => {}
      )
      .then(
        () => {},
        (err) => {
          expect(err).toEqual(200);
        }
      );
  });
});

describe("all", () => {
  test("resolve 状态", () => {
    function fn(index: number, time: number) {
      return new MyPromise((resolve) => {
        setTimeout(() => resolve(index), time);
      });
    }
    return MyPromise.all([fn(1, 2000), fn(2, 1000)]).then((res) => expect(res).toEqual([1, 2]));
  });
  test("reject 状态", () => {
    function fn(index: number, time: number) {
      return new MyPromise((resolve, reject) => {
        setTimeout(() => {
          if (index === 2) {
            reject(index);
          } else {
            resolve(index);
          }
        }, time);
      });
    }
    return MyPromise.all([fn(1, 2000), fn(2, 1000)]).then(
      () => {},
      (err) => {
        expect(err).toEqual(2);
      }
    );
  });
});
