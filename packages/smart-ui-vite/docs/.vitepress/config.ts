const sidebar = {
  "/": [
    { text: "快速开始" },
    {
      text: "通用",
      children: [
        { text: "Button 按钮", link: "/" },
        { text: "AsyncButton 异步按钮", link: "/async-button" },
        { text: "测试", link: "/test" },
      ],
    },
    { text: "导航" },
  ],
};
const config = {
  title: "Hello VitePress ",
  themeConfig: {
    sidebar,
  },
  markdown: {
    config: (md) => {
      const { demoBlockPlugin } = require("vitepress-theme-demoblock");
      md.use(demoBlockPlugin);
    },
  },
};
export default config;
