// import { createApp } from "vue";
// import RenderButton from "./button";
// import SFCButton from "./sfc-button.vue";

// createApp(SFCButton).mount("#app");

import UButton from "./button/index";
import { createApp } from "vue/dist/vue.esm-bundler.js";

createApp({
  template: `<div>
        <UButton color="red" icon="search">红色按钮</UButton>
        <UButton color="gray" icon="edit">绿色按钮</UButton>
        <UButton color="yellow" icon="check">绿色按钮</UButton>
    </div>`,
})
  .component(UButton.name, UButton)
  .mount("#app");
