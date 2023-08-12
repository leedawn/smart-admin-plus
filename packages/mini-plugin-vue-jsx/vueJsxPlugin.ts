import type { FilterPattern } from "vite";
import { createFilter } from "vite";
import type { VueJSXPluginOptions } from "@vue/babel-plugin-jsx";
import * as babel from "@babel/core";
import jsx from "@vue/babel-plugin-jsx";

interface FilterOptions {
  include?: FilterPattern;
}

type Options = VueJSXPluginOptions & FilterOptions;

export default function vueJsxPlugin(options: Options) {
  const filter = createFilter(/\.[tj]sx$/);
  return {
    name: "vite:vue-jsx",
    config() {
      return {
        esbuild: {
          // 没有这个配置不能正常解析 jsx
          include: /\.ts$/,
        },
      };
    },
    transform(code, id, opt) {
      const ssr = opt?.ssr === true;
      const [filePath] = id.split("?");
      if (filter(id) || filter(filePath)) {
        // 过滤文件路径，只保留含有对应后缀的路径
        console.log("🚀 ~ file: vueJsxPlugin.ts:11 ~ transform ~ id:", jsx);

        const result = babel.transformSync(code, {
          babelrc: false, // 加载配置文件
          configFile: false,
          sourceFileName: id,
          sourceMaps: true,
          plugins: [[jsx, {}]],
          ast: true, // 抽象语法树
        });
        console.log("🚀 ~ file: vueJsxPlugin.ts:33 ~ transform ~ result:", result.code);

        if (!result.code) return;

        return {
          code: result.code,
          map: result.map,
        };
      }
    },
  };
}
