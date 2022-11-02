import { App } from "vue";
import RenderButton from "./button";
import SFCButton from "./sfc-button.vue";
import TSXButton from "./tsx-button";

export { RenderButton, SFCButton, TSXButton };

export default {
  install(app: App): void {
    app.component(RenderButton.name, RenderButton);
    app.component(SFCButton.name, SFCButton);
    app.component(TSXButton.name, TSXButton);
  },
};
