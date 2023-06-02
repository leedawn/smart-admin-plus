import { ensureArray } from "../src/array";

test("ensureArray", function () {
  expect(ensureArray(null)).toEqual([]);
});
