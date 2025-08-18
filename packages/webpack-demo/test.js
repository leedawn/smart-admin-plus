const fs = require("fs");
const parser = require("@babel/parser");
const options = require("./webpack.config.js");

const Parser = {
  getAst: (path) => {
    // 读取入口文件
    const content = fs.readFileSync(path, "utf-8");
    // 将文件内容转为 AST 抽象语法树
    return parser.parse(content, {
      sourceType: "module",
    });
  },
};

class Compiler {
  constructor(options) {
    // Webpack 配置
    const { entry, output } = options;
    // 入口
    this.entry = entry;
    // 出口
    this.output = output;
    // 模块
    this.modules = [];
  }
  // 构建启动
  run() {
    const ast = Parser.getAst(this.entry);
    console.log("🚀 ~ Compiler ~ run ~ ast:", ast);
  }
  // 重写 require 函数，输出 bundle
  generate() {
    // ...
  }
}

new Compiler(options).run();
