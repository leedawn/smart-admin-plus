import { MyPromise } from "../src/async/base-promise";

test("基础调用", () => {
  const res = "success";
  const p = new MyPromise((resolve) => {
    resolve(res);
  });
  p.then(
    (data) => {
      expect(data).toEqual(res);
    },
    () => {}
  );
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
    // 链式调用 输出 200
    return new MyPromise((_, reject) => {
      reject(10);
    })
      .then(
        () => {},
        (err) => {
          expect(err).toEqual(10);
          return 2 * (err as number);
        }
      )
      .then(
        (res) => {
          expect(res).toEqual(20);
        },
        () => {}
      );
  });
});

describe("then 调用的时候返回 promise", () => {
  test("succes", () => {
    const p = new MyPromise((resolve) => {
      resolve(100);
    });
    return p.then(
      (data) => new MyPromise((_, reject) => reject(data * 2)),
      () => {}
    ).then(
      () => {},
      (err) => {
        expect(err).toEqual(200);
        console.log("🚀 ~ file: base-promise.test.ts:89 ~ test ~ err:", err);
      }
    );
  });
}); 
