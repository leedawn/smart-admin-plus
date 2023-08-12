import { defineConfig } from "vite";
import vueJsxPlugin from "./vueJsxPlugin";

export default defineConfig({
  plugins: [
    vueJsxPlugin({
      include: [/.jsx$/],
    }),
  ],
});
