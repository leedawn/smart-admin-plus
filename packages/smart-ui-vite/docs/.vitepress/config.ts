const sidebar = {
  "/": [
    { text: "快速开始" },
    { text: "通用", children: [{ text: "Button 按钮", link: "/" }] },
    { text: "导航" },
  ],
};
const config = {
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
