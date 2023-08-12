import { ensureArray } from "../src/array";

test("ensureArray", function () {
  expect(ensureArray(null)).toEqual([]);
  expect(ensureArray("2")).toEqual(["2"]);
});
