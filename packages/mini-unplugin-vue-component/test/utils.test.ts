import { stringifyComponentImport, getNameFromFilePath } from "../src/utils";

describe("stringifyComponentImport", () => {
  test("import without sideEffect", () => {
    const res = stringifyComponentImport({ name: "async", as: "a", from: "demo.ts" });
    expect(res).toEqual("import {async as a} from 'demo.ts'");
  });

  test("import with single sideEffect", () => {
    const res = stringifyComponentImport({ as: "Test", from: "test", sideEffect: "test.css" });
    expect(res).toEqual("import Test from 'test';import 'test.css'");
  });

  test("import with multi sideEffect", () => {
    const res = stringifyComponentImport({ as: "Test", from: "test", sideEffect: ["test1.css", { as: "css", from: "test2.css" }] });
    expect(res).toEqual("import Test from 'test';import 'test1.css';import css from 'test2.css'");
  });
});

describe("getNameFromFilePath", () => {
  const options = {
    directoryAsNamespace: true,
    resolvedDirs: ["/src/components"],
  };

  test("normal name", () => {
    const inComponentFilePath = "/src/components/a/b.vue";
    expect(getNameFromFilePath(inComponentFilePath, options)).toBe("a-b");
  });

  test("special char", () => {
    const inComponentFilePath = "/src/components/[a1]/b_2/c 3/d.4/[...ef]/ghi.vue";
    expect(getNameFromFilePath(inComponentFilePath, options)).toBe("a1-b2-c3-d4-ef-ghi");
  });
});
