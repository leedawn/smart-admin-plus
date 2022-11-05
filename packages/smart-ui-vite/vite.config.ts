import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import Unocss from "./config/unocss";

const rollupOptions = {
  external: ["vue"],
  output: {
    globals: {
      vue: "Vue",
    },
    assetFileNames: `assets/[name].[ext]`, // 去掉生成文件的 hash 值
  },
};

export default defineConfig({
  plugins: [vue(), vueJsx(), Unocss()],
  build: {
    rollupOptions,
    minify: "terser",
    sourcemap: true,
    reportCompressedSize: true, // 生成压缩大小报告
    cssCodeSplit: true,
    lib: {
      entry: "./src/entry.ts",
      name: "SmartUI",
      fileName: "smart-ui",
      formats: ["es", "umd", "iife"],
    },
  },
});
