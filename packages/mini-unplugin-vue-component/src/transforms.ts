import MagicString from "magic-string";
import type Context from "./context";
import { ComponentImportOptions, pascalCase, stringifyComponentImport } from "./utils";

const PluginComment = `/* unplugin-vue-components disabled */`;

interface MatchedResult {
  rawName: string;
  replace: (resolved: string) => {};
}

interface TransformOptions {
  type: string;
  newName: string;
  matchReg: RegExp;
}

const transformComponentOption: TransformOptions = {
  type: "component",
  newName: "__unplugin_components_",
  matchReg: /_resolveComponent[0-9]*\("(.+?)"\)/g,
};
const transformDirectiveOption: TransformOptions = {
  type: "directive",
  newName: "__unplugin_directives_",
  matchReg: /_resolveDirective[0-9]*\("(.+?)"\)/g,
};

export function createTransformer(ctx: Context) {
  return async (code: string) => {
    ctx.searchGlob();
    const s = new MagicString(code);
    await transformVue3(code, s, ctx, transformComponentOption); // 处理组件
    ctx.defaultOptions.directives && (await transformVue3(code, s, ctx, transformDirectiveOption)); // 处理指令
    s.prepend(PluginComment);
    return { code: s.toString() };
  };
}

async function transformVue3(code: string, s: MagicString, ctx: Context, options: TransformOptions) {
  let results: MatchedResult[] = [],
    index = 0;
  if (ctx.defaultOptions.transformer === "vue3") results = resolveVue3(code, s, options);

  for (const { rawName, replace } of results) {
    const name = pascalCase(rawName);
    const component = await ctx.findComponent(name, options.type); // 找到包含导入信息的对象
    if (component) {
      const newName = `${options.newName}${index++}`;
      const option = { ...component, as: newName } as ComponentImportOptions;
      s.prepend(`${stringifyComponentImport(option)};\n`);  // 添加组件或指令的导入语句
      replace(newName);
    }
  }
}

// 找到编译后的组件或指令名称，并且找到替换语句的起始和终止位置
function resolveVue3(code: string, s: MagicString, options: TransformOptions) {
  let results = [];

  for (const match of code.matchAll(options.matchReg)) {
    const matchName = match[1];
    const start = match.index;
    const end = (start as number) + match[0].length;

    results.push({
      rawName: matchName,
      replace: (resolved: string) => s.overwrite(start as number, end, resolved),
    });
  }
  return results;
}
