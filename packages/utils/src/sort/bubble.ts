export function bubbleSort(arr: number[]) {
  const length = arr.length;
  for (let i = 0; i < length; i++) {
    let complete = true;
    for (let j = 0; j < length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        complete = false;
      }
    }
    if (complete) break;
  }
  return arr
}
