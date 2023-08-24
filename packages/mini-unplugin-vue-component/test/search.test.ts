import { relative, resolve } from "pathe";
import Context from "../src/context";

const root = resolve(__dirname, "../examples/vite-vue3");

function cleanup(data: any) {
  return Object.values(data)
    .map((e: any) => {
      delete e.absolute;
      e.from = relative(root, e.from).replace(/\\/g, "/");
      return e;
    })
    .sort((a, b) => (a.as as string).localeCompare(b.as));
}

describe("search", () => {
  it("should work", async () => {
    const ctx = new Context({});
    ctx.setRoot(root);
    ctx.searchGlob();

    expect(cleanup(ctx.componentNameMap())).toEqual([
      {
        as: "Avatar",
        from: "src/components/global/avatar.vue",
      },
      {
        as: "Book",
        from: "src/components/book/index.vue",
      },
      {
        as: "Button",
        from: "src/components/ui/button.vue",
      },
      {
        as: "Checkbox",
        from: "src/components/ui/nested/checkbox.vue",
      },
      {
        as: "CollapseFolderAndComponentFromRoot",
        from: "src/components/collapse/collapseFolder/CollapseFolderAndComponentFromRoot.vue",
      },
      {
        as: "ComponentA",
        from: "src/components/ComponentA.vue",
      },
      {
        as: "ComponentAsync",
        from: "src/components/ComponentAsync.vue",
      },
      {
        as: "ComponentB",
        from: "src/components/ComponentB.vue",
      },
      {
        as: "ComponentC",
        from: "src/components/component-c.vue",
      },
      {
        as: "ComponentD",
        from: "src/components/ComponentD.vue",
      },
      {
        as: "FolderAndComponentPartially",
        from: "src/components/collapse/collapseFolder/FolderAndComponentPartially.vue",
      },
      {
        as: "Recursive",
        from: "src/components/Recursive.vue",
      },
    ]);
  });
});
