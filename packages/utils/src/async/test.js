/* function* test() {
  yield "hello";
  yield "world";
}
const t = test();
console.log(t.next());
console.log(t.next());
console.log(t.next());

function makeTest(arr) {
  let index = 0;
  return {
    next() {
      return index < arr.length ? { value: arr[index++], done: false } : { value: undefined, done: true };
    },
  };
}
const t2 = makeTest(["hello", "world"]);
console.log(t2.next());
console.log(t2.next());
console.log(t2.next());
 */

let obj = { name: "leon", age: 23 };

function* entries(obj) {
  for (const k in obj) {
    yield [k, obj[k]];
  }
}

for (const [key, value] of entries(obj)) {
  console.log(key, value);
}
