let map = new Map();
let weakMap = new WeakMap();

(function () {
  let foo = { foo: 1 };
  let bar = { bar: 2 };
  map.set(foo, 1);
  weakMap.set(bar, 2);
})();
console.log(map.keys);
console.log(weakMap.keys);
