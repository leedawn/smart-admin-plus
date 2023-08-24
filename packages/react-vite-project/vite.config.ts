import { defineConfig, normalizePath } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import autoprefixer from 'autoprefixer';
import svgr from 'vite-plugin-svgr';
// import myPlugin from './src/plugins/my-plugin';

const variablePath = normalizePath(path.resolve('./src/variable.scss'));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    // modules: {
    //   generateScopedName: "[name]__[local]__[hash:base64:5]",
    // },
    // preprocessorOptions: {
    //   scss: {
    //     additionalData: `@import "${variablePath}";`,
    //   },
    // },
    /** fail */
    // postcss: {
    //   plugins: [
    //     autoprefixer({
    //       // 指定目标浏览器
    //       overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
    //     })
    //   ]
    // }
  },
  resolve: {
    alias: {
      '@assets': path.join(__dirname, 'src/assets')
    }
  },
  // json: {
  //   // stringify: true  // 禁用按名导入 json 文件
  // },
  optimizeDeps: {
    include: ['object-assign']
  }
});
