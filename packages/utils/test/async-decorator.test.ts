import { promiseLock, delay } from "../src/async";

describe("promiseLock 的装饰器语法", () => {
  test("基础例子", async () => {
    const fn = jest.fn();
    class JestTest {
      @promiseLock(() => "key")
      async baseFn() {
        await delay(10);
        fn();
      }
    }

    const jestTest = new JestTest();
    await Promise.all([jestTest.baseFn(), jestTest.baseFn()]);
    expect(fn).toBeCalledTimes(1);
  });
});
