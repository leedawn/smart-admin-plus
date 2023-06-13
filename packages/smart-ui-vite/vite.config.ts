/// <reference types="vitest"/>
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";

import Unocss from "./config/unocss";

const rollupOptions = {
  external: ["vue", "ant-design-vue", "lodash"],
  output: {
    globals: {
      vue: "Vue",
      "ant-design-vue": "ant-design-vue",
      lodash: "lodash",
    },
    assetFileNames: `assets/[name].[ext]`, // 去掉生成文件的 hash 值
  },
};

export default defineConfig({
  plugins: [vue(), vueJsx(), Unocss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions,
    minify: "terser",
    sourcemap: true,
    reportCompressedSize: true, // 生成压缩大小报告
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, "src/components/entry.ts"),
      name: "SmartUI",
      fileName: "smart-ui",
      formats: ["es", "umd", "iife"],
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
    transformMode: {
      web: [/.[tj]sx$/],
    },
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
    },
  },
});
