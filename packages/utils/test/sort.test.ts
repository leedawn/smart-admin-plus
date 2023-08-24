import { quickSort } from "../src/sort/quick";
import { bubbleSort } from "../src/sort/bubble";

let nums = [34, 2, 46, 6, 8, 35, 23, 29, 1];
let res = [1, 2, 6, 8, 23, 29, 34, 35, 46];

test("bubbleSort", () => {
  expect(bubbleSort(nums)).toEqual(res);
});

test("quickSrot", () => {
  expect(quickSort(nums)).toEqual(res);
});
