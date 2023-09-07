/// <reference types="vite/client" />

// 三斜线指令是单行注释，放在文件的顶端。/// <reference types="..." /> 声明了对某个包的依赖，编写 d.ts 文件才需要这个指令
// 配置环境变量的 typescript 智能提示
interface ImportMetaEnv {
  readonly VITE_KEY: string;
}
