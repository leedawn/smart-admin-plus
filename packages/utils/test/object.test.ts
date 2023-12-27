import { deepClone } from "../src/object";
import { objectFactory, myInstanceOf } from "../src";

test("deepClone", () => {
  let obj: any = {};
  let obj0 = { foo: obj };
  obj = { name: "leon", info: [2, { age: 23, another: obj0 }] };
  let res = deepClone(obj);
  obj.name = "wow";
  obj.info[0] = 33;
  // @ts-ignore
  obj.info[1].age = 77;
  expect(res).toEqual({ name: "leon", info: [2, { age: 23, another: { foo: {} } }] });
});

test("objectFactory", () => {
  function Fn() {}
  Fn.prototype.print = function () {
    return this.name;
  };

  const obj = objectFactory(Fn, 23);
  const name = "leon";
  obj.name = name;
  expect(obj.print()).toEqual(name);
});

test("objectFactory2", () => {
  const wow = "wow";
  function Fn() {
    return {
      name: wow,
    };
  }
  Fn.prototype.print = function () {
    return this.name;
  };

  const obj = objectFactory(Fn, 23);
  expect(obj.name).toEqual(wow);
});

test("instanceof", () => {
  expect(myInstanceOf([], Array)).toBe(true);
  expect(myInstanceOf({}, Array)).toBe(false);
});
