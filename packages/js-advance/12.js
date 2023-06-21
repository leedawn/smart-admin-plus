// JS 语义分析该用迭代还是递归

// 1. 迭代就是使用循环。递归就是调用函数本身，包括基本条件（终止条件）和递归本身。

function fibonacci(n) {
  if (n < 1) return 0;
  else if (n <= 2) return 1;
  let prev = 1,
    cur = 1,
    res = 0;
  for (let i = 3; i <= n; i++) {
    res = prev + cur;
    prev = cur;
    cur = res;
  }
  return res;
}
console.log(fibonacci(10)); // 55

// 2. 使用了递归+分治思想。分治指的是将获得结果的过程变成了求两个函数之和
function fibonacci2(n) {
  if (n < 3) return 1;
  return fibonacci2(n - 1) + fibonacci2(n - 2);
}
console.log(fibonacci2(10)); // 55

// 3. 使用了递归+分治+闭包思想。这里的 memo 参数使函数有记忆功能（实际上使用了函数传递的对象参数实际上是对象的地址），解决了重叠子问题。
function fibonacci3(n, memo = [0, 1, 1]) {
  if (memo[n]) return memo[n];
  memo[n] = fibonacci3(n - 1, memo) + fibonacci3(n - 2, memo);
  return memo[n];
}
console.log(fibonacci3(10));

// 4. 尾递归。将递归调用放到函数底部。实际上在递归调用的过程中，两个参数已经进行了相加的过程。
function fibonacci4(n, lastLast, last) {
  if (n === 0) return lastLast;
  if (n === 1) return last;
  return fibonacci4(n - 1, last, lastLast + last);
}
console.log(fibonacci4(10, 0, 1));

// 5. 栈溢出。检测浏览器栈溢出情况时递归调用函数的次数。
let i = 0;
function test() {
  i++;
  test();
}
try {
  test();
} catch (e) {
  console.log("i:" + i + " ", e); // chrome 13919
}

// 6. 算法复杂度。可以使用递归树来分析，其他方法很复杂。前面的例子中直接使用递归，每次都需要执行两次递归调用，最后的时间复杂度是2的 n 次方，而尾递归
// 将时间复杂度变成 n.
