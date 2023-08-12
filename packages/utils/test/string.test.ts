import { slash } from "../src/string";

test("slash", () => {
  expect(slash("\\\\a")).toEqual("//a");
  expect(slash("\\a")).toEqual("/a");
  expect(slash("\\a")).toEqual("/a");
});
