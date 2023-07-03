// 1. object.create 仿写
// function create(obj: Object) {
//   function fn() {}
//   fn.prototype = obj;
//   return new fn();
// }

// const person = {
//   print() {
//     console.log("my name is " + this.name);
//   },
// };

// const p = create(person);
// p.name = "leon";
// p.print();

// 2. new 仿写
/* function objectFactory(constructor, ...args) {
  let newObject = null;
  newObject = Object.create(constructor.prototype);
  const result = constructor.apply(newObject, args);
  if (result && (typeof result === "object" || typeof result === "function")) {
    return result;
  } else {
    return newObject;
  }
}

function Fn() {}
Fn.prototype.print = function () {
  console.log(this.name);
};

const obj = objectFactory(Fn, 23);
obj.name = "leon";
obj.print();
 */
