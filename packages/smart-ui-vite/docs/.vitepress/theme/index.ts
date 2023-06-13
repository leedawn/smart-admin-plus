import Theme from "vitepress/dist/client/theme-default";
// import Theme from "vitepress/theme";
import SmartUI from "../../../src/components/entry";
import Demo from "vitepress-theme-demoblock/components/Demo.vue";
import DemoBlock from "vitepress-theme-demoblock/components/DemoBlock.vue";
import "vitepress-theme-demoblock/theme/styles/index.css";

export default {
  ...Theme,
  enhanceApp(ctx) {
    // Theme.enhanceApp(ctx);
    ctx.app.use(SmartUI);
    ctx.app.component("Demo", Demo);
    ctx.app.component("DemoBlock", DemoBlock);
  },
};
