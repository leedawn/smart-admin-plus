import { delay } from "../src/async";
import { compose, debounce, throttle } from "../src/fn";

test("debounce", async () => {
  const fn = jest.fn();
  setInterval(debounce(fn, 600), 500);
  await delay(600);
  expect(fn).toBeCalledTimes(0);
});

test("throttle", async () => {
  const fn = jest.fn();
  setInterval(throttle(fn, 2000), 200);
  await delay(2100);
  expect(fn).toBeCalledTimes(1);
});

test("compose", () => {
  function fn1(x: number) {
    return x + 1;
  }
  function fn2(x: number) {
    return x + 2;
  }
  function fn3(x: number) {
    return x + 3;
  }
  function fn4(x: number) {
    return x / 4;
  }
  const a = compose(fn1, fn2, fn3, fn4);
  expect(a(4)).toEqual(7);
  const b = compose();
  expect(b(1)).toEqual(1);
});
