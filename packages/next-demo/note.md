# 搭建一个服务端渲染项目

### 项目初始化

创建项目。支持路径别名

```
npx create-next-app@latest --typescript
```

```
/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  ...
  webpck: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname),
    };
    return config;
  },
};
...
```

```
{
  "compilerOptions": {
    ...
    "baseUrl": "./",    // 添加别名解析
    "paths": {
      "@/*": ["./*"]
    },
  },
  ...
}

```

### 模块化代码提示

1. 使用 sass

```
npm install sass --save-dev
```

```
import styles from "../styles/index.module.scss";

export default function Home() {
  return (
    <div className={styles.demo}>
      <h1 className={styles.title}>demo</h1>
    </div>
  );
}
```

2. 添加样式代码提示功能

```
npm install typescript-plugin-css-modules --save-dev
```

```
{
  "compilerOptions": {
   ...
    "plugins": [{ "name": "typescript-plugin-css-modules" }]
  },
  ...
}
```
```
// add vscode setting.  shortcut: ctrl+shift+p.. after finish, reload window
{
     // ...前面的保持原状就可以
    "typescript.tsserver.pluginPaths": ["typescript-plugin-css-modules"],
    "typescript.tsdk": "node_modules/typescript/lib",
    "typescript.enablePromptUseWorkspaceTsdk": true
}
```

### 服务端调试能力（这个没成功）