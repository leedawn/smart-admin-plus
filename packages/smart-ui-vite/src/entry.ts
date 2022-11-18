import { App } from "vue";
import RenderButton from "./button/render-button";
import SFCButton from "./sfc-button.vue";
import TSXButton from "./tsx-button";
import UButton from "./button";
import AsyncButton from "./async-button";
import UInput from "./input";

export { RenderButton, SFCButton, TSXButton };

export default {
  install(app: App): void {
    app.component(UButton.name, UButton);
    app.component(RenderButton.name, RenderButton);
    app.component(SFCButton.name, SFCButton);
    app.component(TSXButton.name, TSXButton);
    app.component(AsyncButton.name, AsyncButton);
    app.component(UInput.name, UInput);
  },
};
