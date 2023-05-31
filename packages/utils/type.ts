function myInstanceof(left, right) {
  left = Object.getPrototypeOf(left);
  const prototype = right.prototype;

  while (true) {
    if (!left) return false;
    if (left === prototype) return true;
    left = Object.getPrototypeOf(left);
  }
}

let arr = [2, 34];
console.log(myInstanceof(arr, Array));
console.log(arr instanceof Array);
