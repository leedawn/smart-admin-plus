// import Theme from "vitepress/dist/client/theme-default";
import Theme from "vitepress/theme";
import SmartUI from "../../../src/entry";
import Demo from "vitepress-theme-demoblock/dist/client/components/Demo.vue";
import DemoBlock from "vitepress-theme-demoblock/dist/client/components/DemoBlock.vue";
import "vitepress-theme-demoblock/dist/theme/styles/index.css";

export default {
  ...Theme,
  enhanceApp(ctx) {
    Theme.enhanceApp(ctx);
    ctx.app.use(SmartUI);
    ctx.app.component("Demo", Demo);
    ctx.app.component("DemoBlock", DemoBlock);
  },
};
