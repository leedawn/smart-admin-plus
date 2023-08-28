import { quickSort } from "../src/sort/quick";
import { bubbleSort } from "../src/sort/bubble";
import { selectionSort } from "../src/sort/selection";
import { mergeSort } from "../src/sort/merge";

let nums: number[] = [];
let res: number[] = [];

beforeEach(() => {
  nums = [34, 2, 46, 6, 8, 35, 23, 29, 1];
  res = [1, 2, 6, 8, 23, 29, 34, 35, 46];
});

test("bubbleSort", () => {
  expect(bubbleSort(nums)).toEqual(res);
});

test("quickSrot", () => {
  expect(quickSort(nums)).toEqual(res);
});

it("selectionSort", () => {
  expect(selectionSort(nums)).toEqual(res);
});

it("mergeSort", () => {
  expect(mergeSort(nums)).toEqual(res);
});
