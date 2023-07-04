import { delay, promiseLock, refreshPromiseLock } from "../src/async";

test("异步延迟函数", async () => {
  const callTime = Date.now();
  await delay(100);
  expect(Date.now() - callTime).toBeGreaterThanOrEqual(100);
});

describe("promiseLocak", () => {
  test("promiseLock 基础例子", async () => {
    const fn = jest.fn();
    const asyncFn = () => delay(100).then(() => fn());
    const asyncFnWithLock = promiseLock(asyncFn, () => "key");
    await Promise.all([
      asyncFnWithLock(),
      asyncFnWithLock(),
      asyncFnWithLock(),
    ]);
    expect(fn).toBeCalledTimes(1);
  });

  test("promiseLock 的 trace 执行", async () => {
    const trace = jest.fn();
    const asyncFn = () => delay(100).then(() => ({}));
    const asyncFnWithLock = promiseLock(asyncFn, {
      keyGenerator: () => "key",
      trace,
    });
    const [res1, res2, res3] = await Promise.all([
      asyncFnWithLock(),
      asyncFnWithLock(),
      asyncFnWithLock(),
    ]);
    expect(res1).toStrictEqual(res2);
    expect(res2).toStrictEqual(res3);
    expect(trace).toBeCalledTimes(2);
  });

  test("promiseLock 的 forever 功能", async () => {
    const fn = jest.fn();
    const asyncFn = () => delay(100).then(() => fn());
    const asyncFnWithLock = promiseLock(asyncFn, {
      keyGenerator: () => "key",
      // forever: false,
    });
    const [res1, res2, res3] = await Promise.all([
      asyncFnWithLock(),
      asyncFnWithLock(),
      asyncFnWithLock(),
    ]);
    console.log("wow");

    await asyncFnWithLock();
    expect(res1).toStrictEqual(res2);
    expect(res2).toStrictEqual(res3);
    expect(fn).toBeCalledTimes(1);
  });

  test("promiseLock 的清除锁功能", async () => {
    const fn = jest.fn();
    const asyncFn = () => delay(100).then(() => fn());
    const asyncFnWithLock = promiseLock(asyncFn, () => "key");
    await asyncFnWithLock();
    await asyncFnWithLock();
    expect(fn).toBeCalledTimes(1);
    expect(refreshPromiseLock(asyncFnWithLock)).toBeTruthy();
    await asyncFnWithLock();
    expect(fn).toBeCalledTimes(2);
    expect(refreshPromiseLock(() => {})).toBeFalsy();
  });

  // test("promiseLock 的 forever 和 refresh 功能", async () => {
  //   const fn = jest.fn();
  //   const asyncFn = () => delay(100).then(() => fn());
  //   const asyncFnWithLock = promiseLock(asyncFn, {
  //     forever: true,
  //     keyGenerator: () => "key",
  //   });
  //   await Promise.all([asyncFnWithLock(), asyncFnWithLock()]);
  //   await asyncFnWithLock();
  //   expect(fn).toBeCalledTimes(1);
  // });
});
