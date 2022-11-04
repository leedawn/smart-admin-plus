import { defineComponent, PropType } from "vue";
import "uno.css";

export type IColor = "red" | "gray" | "yellow";
export type IIcon = "search" | "edit" | "check";
export const props = {
  color: {
    type: String as PropType<IColor>,
    default: "blue",
  },
  icon: {
    type: String as PropType<IIcon>,
    default: "search",
  },
};
export default defineComponent({
  name: "UButton",
  props,
  setup(props, { slots }) {
    return () => (
      <button
        class={`py-2 bg-${props.color}-500 hover:bg-green-700 border-none`}
      >
        {!props.icon ? "" : <i class={`i-ic-baseline-${props.icon} p-3`}></i>}
        {slots.default ? slots.default() : ""}
      </button>
    );
  },
});
