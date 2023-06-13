import { App } from "vue";
import RenderButton from "./button/render-button";
import UButton from "./button";
import AsyncButton from "./async-button";
import UInput from "./input";
import UIcon from "./icon";
import UDatePicker from "./date-picker";
import UModal from "./modal";

export { RenderButton };

export default {
  install(app: App): void {
    app.component(UButton.name, UButton);
    app.component(RenderButton.name, RenderButton);
    app.component(AsyncButton.name, AsyncButton);
    app.component(UInput.name, UInput);
    app.component(UIcon.name, UIcon);
    app.component(UDatePicker.name, UDatePicker);
    app.component(UModal.name, UModal);
  },
};
