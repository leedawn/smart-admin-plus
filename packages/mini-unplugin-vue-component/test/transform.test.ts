import Context from "../src/context";
import type { Resolvers } from "../src/context";

const resolver: Resolvers[] = [
  {
    type: "component",
    resolve: (name) => ({ from: `test/component/${name}` }),
  },
  {
    type: "directive",
    resolve: (name) => ({ from: `test/directive/${name}` }),
  },
];

//  编写测试用例的方式不一样，所以编码的格式有些不同
it("vue3 transform should work", async () => {
  const code = `    const render = (_ctx, _cache) => {
      const _component_test_comp = _resolveComponent("test-comp")
      const _directive_loading = _resolveDirective("loading")
    
      return _withDirectives(
        (_openBlock(),
        _createBlock(_component_test_comp, null, null, 512 /* NEED_PATCH */)),
        [[_directive_loading, 123]]
      )
    }
    `;

  const ctx = new Context({
    resolvers: [resolver],
    transformer: "vue3",
    directives: true,
  });
  expect(await ctx.transform(code, "")).toEqual({
    code: `/* unplugin-vue-components disabled */import __unplugin_directives_0 from 'test/directive/Loading';
import __unplugin_components_0 from 'test/component/TestComp';
    const render = (_ctx, _cache) => {
      const _component_test_comp = __unplugin_components_0
      const _directive_loading = __unplugin_directives_0
    
      return _withDirectives(
        (_openBlock(),
        _createBlock(_component_test_comp, null, null, 512 /* NEED_PATCH */)),
        [[_directive_loading, 123]]
      )
    }
    `,
  });
});
