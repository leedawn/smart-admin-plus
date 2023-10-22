import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import path from "path";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer"; // 使用失败，没有效果
// import viteCDNPlugin from "vite-plugin-cdn-import";
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  base: "", // 配置公共基础路径
  build: {
    sourcemap: true, // 构建后生成 source map 文件
    assetsInlineLimit: 40960, // 修改图片转 base64 的阈值。使用 base64 可以避免额外的 http 请求
    outDir: "dist", // 默认值 dist
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          console.log("🚀 ~ file: vite.config.ts:19 ~ id:", id)
          if (id.includes("node_modules")) {
            return "vender";
          }
        },
      },
    },
    reportCompressedSize: false,
  },

  plugins: [
    viteCompression(),   // 不确定这个插件是否能够压缩
    ViteImageOptimizer({ jpeg: { quality: 10 } }),
    checker({ typescript: true }),
    vue(),
    // @ts-ignore
    visualizer(),
    // @ts-ignore
    // viteCDNPlugin({ modules: [{ name: "lodash", var: "_", path: `https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js` }] }), // 生成 CDN 链接
  ], // 检查 typescript 语法。ts 默认只转义，需要使用这个插件将 ts 报错显示到控制台和浏览器上
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "./src/css/global.less";`, // 修改变量需要重新启动服务
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 配置别名
    },
    extensions: [".ts"], // 默认值： ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
  },
  server: {
    // host: true,  // 开启后会监听所有地址
  },
});
