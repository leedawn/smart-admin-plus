# 手动安装

### nuxt 需要额外安装下面几个依赖包

```
{
  ...
  "type": "module",
  "dependencies": {
    "node-fetch": "2.6.7",   // 这个是 cjs 版本，不是最新版
    "nuxt": "^2.15.8",
    "ufo": "^1.0.1",
    "vue": "2.7.14",        // 不是最新版
    "vue-client-only": "^2.1.0",
    "vue-meta": "^2.4.0",
    "vue-no-ssr": "^1.1.1",
    "vue-router": "3.6.5"
  }
}

```
