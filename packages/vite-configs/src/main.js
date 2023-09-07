// @ts-nocheck
import { print } from "./a.js";
import example from "@/css/test.module.css";
import "./css/test.less"; // 不知道为什么，less 文件可以直接识别
import shen from "./images/shenTest.jpeg?url"; // 默认后缀是 ?url（通过 url 导入），可以修改为 ？raw（通过字符串导入）
import json from "./json/test.json";
import { tsVar } from "./ts/test";
import app from "./app.vue";
import { createApp } from "vue";

print("haha");
document.getElementById("module").className = example.yellow;
document.getElementById("img").src = shen;
console.log("json:", json);
console.log("typescript: ", tsVar);
console.log("env:", import.meta.env.VITE_KEY, import.meta.env.NoUse, import.meta.env.MODE); // import.meta.env.MODE 是内建变量
createApp(app).mount("#app");
