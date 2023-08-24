export function quickSort<T = number>(arr: T[]): T[] {
  if (arr.length < 2) return arr;
  const target = arr[0];
  let left = [],
    right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < target) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([target], quickSort(right));
}
