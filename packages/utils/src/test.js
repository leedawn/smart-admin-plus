// @ts-nocheck
// 题目描述
// 数据传播过程中会出现一些噪声，用一个数组记录了噪声出现的情况。每个噪声出现的次数代表噪声的频度，请找出记录中包含频度最高的噪声的最小子数组长度。
//         示例 输入：
//         [1, 3, 2, 2, 4, 1]
//         输出：2
//         解释：频度最高的有1和2，频度是2（出现的次数都是2）。可以包含频度最高的记录最短数组是[2,2]，输出最小长度为2
//         [1, 2, 2, 4, 2, 1, 1]
//         输出：4
//         解释：频度最高的是1和2。最短的是：[2, 2, 4, 2]
// 输入
// 噪声出现情况的数组
// 输出
// 包含频度最高的噪声的最小子数组长度。
// 样例 1：
// 1 3 2 2 4 1
// 输出
// 2

// 样例 2：
// 1 2 2 4 2 1 1
// 输出
// 4

function handle(arr) {
  let records = {}; // 保存数据
  for (const a of arr) {
    if (!records[a]) {
      records[a] = 1;
    } else {
      records[a] += 1;
    }
  }
  console.log(records);

  const counts = Object.values(records);
  counts.sort((a, b) => b - a);
  const maxCounts = counts[0];
  let maxCountNums = []; // 出现次数最多的数据
  Object.keys(records).forEach((k) => {
    const count = records[k];
    if (count === maxCounts) {
      maxCountNums.push(Number(k));
    }
  });
  console.log(maxCountNums);

  let minLength = arr.length + 1; // 最小数组长度
  for (const num of arr) {
    if (maxCountNums.includes(num)) {
      const first = arr.indexOf(num);
      const last = arr.lastIndexOf(num);
      //   console.log(first, last);
      minLength = Math.min(minLength, last - first + 1);
    }
  }
  return minLength;
}
// console.log(handle([1, 3, 2, 2, 4, 1]));
console.log(handle([1, 2, 2, 4, 2, 1, 1]));
