// import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  runtimeConfig: {
    apiSecret: 123, // 会被 .env 文件覆盖
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/color.scss" as *;',
        },
      },
    },
  },
  app: {
    head: {
      title: "my app",
    },
    pageTransition: {
      name: "about",
      mode: "out-in",
    },
  },
});
