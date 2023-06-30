import { isReactive, reactive } from "../src/reactivity/reactive";

describe("reactive", () => {
  test("Object", () => {
    const original = { foo: 1 };
    const observed = reactive(original);
    expect(observed).not.toBe(original);
    expect(isReactive(observed as Record<string, unknown>)).toBe(true);
    expect(isReactive(original as Record<string, unknown>)).toBe(false);
    // get
    expect((observed as Record<string, unknown>).foo).toBe(1);
    // has
    expect("foo" in (observed as Record<string, unknown>)).toBe(true);
    expect(Object.keys(observed as Record<string, unknown>)).toEqual(["foo"]);
  });
});
