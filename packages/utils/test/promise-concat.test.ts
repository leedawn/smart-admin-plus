import { delay, promiseConcat } from "../src/async";

test("异步函数合并", async () => {
  const square = jest.fn(async (args: number[]) =>
    delay(500).then(() => args.map((num) => Math.pow(num, 2)))
  );
  const concatSquare = promiseConcat(square);
  const a = [1, 2, 3].map(concatSquare);
  await delay(100);
  const b = [2, 3, 4].map(concatSquare);
  await Promise.all([...a, ...b]);
  expect(square).toBeCalledTimes(2);
  expect(square).nthCalledWith(1, [1, 2, 3]);
  //   expect(square).nthCalledWith(2, [2, 3, 4]);
  //   expect(result).toEqual([1, 4, 9, 4, 9, 16]);
});
