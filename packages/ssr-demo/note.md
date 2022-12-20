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

### 模版页面的渲染
1. 页面内容。这边是使用 React 函数式的写法来搭建模板而不是创建类的形式，在大型项目中， React 函数式的写法不需要创建实例，可以按照实际的业务情形来拆分组件的粒度，加上有 react hook 的帮助，我们已经不再需要去过多关注生命周期，相反更多是一种“组合大于继承”的思想，对大家理解函数式编程也会有大的帮助。
```
pnpm i react react-dom 
pnpm i -D @types/react @types/react-dom
```
```
// 创建组件
// ./src/pages/Home/index.tsx
const Home = () => {
  return (
    <div>
      <h1>hello-ssr</h1>
      <button
        onClick={(): void => {
          alert("hello-ssr");
        }
      >
        alert
      </button>
    </div>
  );
};

export default Home;
```
```
// 将模版元素转成字符串
// ./src/server/index.tsx
import express from "express";
import childProcess from "child_process";
import { renderToString } from "react-dom/server";
import Home from "@/pages/Home";

const app = express();
const content = renderToString(<Home />);

app.get("*", (req, res) => {
  res.send(`
    <html
      <body>
        <div>${content}</div>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("ssr-server listen on 3000");
});

childProcess.exec("start http://127.0.0.1:3000");
```
2. 绑定事件。这个也叫“同构”，是服务器端渲染的核心概念，同一套 React 代码在服务器端渲染一遍，然后在客户端再执行一遍。服务端负责静态 dom 的拼接，而客户端负责事件的绑定，不仅是模板页面渲染，后面的路由，数据的请求都涉及到同构的概念。
```
import { hydrateRoot } from "react-dom/client";
import Home from "@/pages/Home";

hydrateRoot(document.getElementById("root") as Document | Element, <Home />);
```
```
// webpack 打包命令
// webpack.client.js
const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  mode: "development",
  entry: "./src/client/index.tsx",
  output: {
    filename: "index.js",
    path: path.resolve(process.cwd(), "client_build"),
  },
});
```
```
// package.json
"scripts": {
    "build:client": "npx webpack build --config ./webpack.client.js --watch",
},
```
```
// 引入客户端打包后的文件
// ./src/server/index.tsx
import express from "express";
import childProcess from "child_process";
import { renderToString } from "react-dom/server";
import Home from "@/pages/Home";
import path from "path";

const app = express();
const content = renderToString(<Home />);

app.use(express.static(path.resolve(process.cwd(), "client_build")));

app.get("*", (req, res) => {
  res.send(`
    <html
      <body>
        <div id="root">${content}</div>
        <script src="/index.js"></script>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("ssr-server listen on 3000");
});

childProcess.exec("start http://127.0.0.1:3000");
```

### 路由的匹配
利用同构原理，使客户端和服务端都有路由配置。使用无状态路由 StaticRouter，客户端中历史记录会改变状态，同时使屏幕更新，而服务端不能改动
到状态。使用 a 标签会发生服务器端的路由跳转，会有对服务端的请求；而 react 路由会发生客户端的路由跳转，不会有请求。

```
pnpm i react-router-dom 
```
```
// src/pages/Demo/index.tsx
import { FC } from "react";
const demo: FC = () => <div>这是一个DOMO页面</div>;
export default demo;
```
```
import Home from "./pages/Home";
import Demo from "./pages/Domo";

interface IRouter {
  path: string;
  element: JSX.Element;
}

const router: IRouter[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/demo",
    element: <Demo />,
  },
];
export default router;
```
```
// src/client/index.tsx
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import router from "../router";

const Client = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        {router.map((item, index) => {
          return <Route {...item} key={index}></Route>;
        })}
      </Routes>
    </BrowserRouter>
  );
};

hydrateRoot(document.getElementById("root") as Document | Element, <Client />);

```
```
// src/server/index.tsx
import { renderToString } from "react-dom/server";
import router from "../router";
import { StaticRouter } from "react-router-dom/server";
import { Route, Routes } from "react-router-dom";

...
app.get("*", (req, res) => {
  const content = renderToString(
    <StaticRouter location={req.path}>
      <Routes>
        {router.map((item, index) => {
          return <Route {...item} key={index}></Route>;
        })}
      </Routes>
    </StaticRouter>
  );
 ...
});
```
```
// src/pages/Demo/index.tsx
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigator = useNavigate();
  return (
    <div>
      <button onClick={() => alert("hello ssr")}>test</button>
      <a href="http://127.0.0.1:3000/demo">链接跳转</a>
      <span onClick={() => navigator("/demo")}>路由跳转</span>
    </div>
  );
};

export default Home;
```

### header 标签的修改
使用到了同构，包括客户端和服务端
```
pnpm install react-helmet --save
pnpm install @types/react-helmet --save-dev
```
```
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Helmet } from "react-helmet";

const Home = () => {
  const navigator = useNavigate();
  return (
    <Fragment>
      <Helmet>
        <title>服务端渲染</title>
        <meta name="description" content="服务端渲染" />
      </Helmet>
      <div>
        ...
      </div>
    </Fragment>
  );
};

export default Home;
```
```
import { Helmet } from "react-helmet";
...

app.get("*", (req, res) => {
 ...

  const helmet = Helmet.renderStatic();
  res.send(`
    <html>
    <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
    </head>
     ...
    </html>
  `);
});

...

```