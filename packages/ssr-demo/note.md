# 架构实现

### eslint

1. npm init 之后安装相关联的依赖

```
npm install eslint eslint-plugin-react @typescript-eslint/eslint-plugin @typescript-eslint/parser  --save-dev
```

2. npx eslint --init 初始化 eslint 的配置，会自动生成下面的文件

```
module.exports = {
  env: {
    browser: true,
    commonjs: true, // add
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/jsx-uses-react": "off", // add
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-var-requires": "off",
  },
};
```

### commitlint

1. 安装依赖包，执行脚本

```
pnpm i -D @commitlint/config-conventional @commitlint/cli
echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js
```

2. 修改配置文件

```
// commitlint.config.js
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ["feat", "fix", "revert"]],
    "subject-max-length": [1, "always", 30],
  },
};
```

3. 使用 husky，当 git commit 的时候进行校验

```
npm install husky --save-dev
npx husky install
npx husky add .husky/pre-commit

```

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx eslint src/**
npx --no-install commitlint --edit $1
```

### 项目构建

1. 安装 express，创建测试文件

```
const express = require("express");
const childProcess = require("child_process");

const app = express();

app.get("*", (req, res) => {
  res.send(`
    <html
      <body>
        <div>hello-ssr</div>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("ssr-server listen on 3000");
});

childProcess.exec("start http://127.0.0.1:3000");

```

2. node 不支持 ts 文件，所以需要使用 webpack 进行打包处理

```
pnpm install @babel/preset-env babel-loader ts-loader webpack webpack-merge webpack-cli --save-dev
```

```
// webpack.base.js
const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /.(ts|tsx)?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
    },
  },
};
```

```
const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  mode: "development",
  entry: "./src/server/index.tsx",
  target: "node",
  output: {
    filename: "bundle.js",
    path: path.resolve(process.cwd(), "server_build"),
  },
});
```

3. 为了读取 .d.ts 依赖，需要修改前面的测试文件，更换导入依赖的方式。配置 tsconfig.json 用于 ts 代码编写。另外需要安装类型定义文件，否则会出现找不到类型文件的报错提示。

```
import express from "express";
import childProcess from "child_process";
```

```
{
  "compilerOptions": {
    "module": "CommonJS",
    "types": ["node"], // 声明类型，使得ts-node支持对tsx的编译
    "jsx": "react-jsx", // 全局导入, 不再需要每个文件定义react
    "target": "es6",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "baseUrl": "./",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"]
}
```

```
pnpm i @types/express --save-dev
```

4. 使用 nodemon 提供对运行文件的监听听力。配置命令方便执行

```
pnpm install nodemon --save-dev
```

```
  "scripts": {
    "start": "nodemon server_build/bundle.js --watch",
    "build:server": "npx webpack build --config ./webpack.server.js --watch"
  },
```
