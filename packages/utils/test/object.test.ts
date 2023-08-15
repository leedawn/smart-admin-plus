import { deepClone } from "../src/object";

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
