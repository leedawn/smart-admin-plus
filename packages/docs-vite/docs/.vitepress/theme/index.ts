import Theme from "vitepress/dist/client/theme-default";
import SmartUI from "smart-ui-vite/dist/smart-ui.mjs";
import "smart-ui-vite/dist/assets/entry.1a9e7183.css";

import Demo from "vitepress-theme-demoblock/components/Demo.vue";
import DemoBlock from "vitepress-theme-demoblock/components/DemoBlock.vue";
import "vitepress-theme-demoblock/theme/styles/index.css";

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(SmartUI);
    app.component("Demo", Demo);
    app.component("DemoBlock", DemoBlock);
  },
};
