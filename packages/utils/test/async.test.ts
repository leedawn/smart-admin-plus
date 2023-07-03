import { delay } from "../src/async";

test("异步延迟函数", async () => {
  const callTime = Date.now();
  await delay(100);
  expect(Date.now() - callTime).toBeGreaterThanOrEqual(100);
});
