import { VueClass } from "../src/index";

it("simpleVue", () => {
  const FIRST: number = 1;
  const SECOND: number = 2;
  const tc: any = new VueClass({ a: FIRST });
  expect(tc.a).toEqual(1);

  tc.$on("a", (newValue: number, oldValue: number) => {
    expect(newValue).toEqual(SECOND);
    expect(oldValue).toEqual(FIRST);
  });

  tc.a = SECOND; // 触发事件，输出: 2, 1
  expect(tc.a).toEqual(SECOND);
});
