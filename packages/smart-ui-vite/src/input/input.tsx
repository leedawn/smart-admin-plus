import { computed, defineComponent } from "vue";
import { Input, InputPassword } from "ant-design-vue";
import "ant-design-vue/es/input/style/css";
import { trim } from "lodash";

export default defineComponent({
  name: "UInput",
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    password: {
      type: Boolean,
      default: false,
    },
    trim: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:value", "blur"],
  inheritAttrs: false,

  setup(props, { emit, attrs, slots }) {
    const stringValue = computed(() => {
      const value = props.value;
      if (Array.isArray(value)) return value.join("");
      switch (typeof value) {
        case "string":
          return value;
        case "boolean":
        case "number":
        case "bigint":
          return value.toString();
        default:
          return "";
      }
    });

    const trimValue = computed(() => trim(stringValue.value));

    const blur = (event) => {
      if (props.trim && !Object.is(trimValue, stringValue)) {
        emit("update:value", trimValue.value);
      }
      emit("blur", event);
    };

    const input = (e) => {
      emit("update:value", e.target.value);
    };

    return () =>
      props.password ? (
        <InputPassword
          {...attrs}
          value={stringValue.value}
          onBlur={blur}
          onInput={input}
        >
          {slots}
        </InputPassword>
      ) : (
        <Input
          {...attrs}
          value={stringValue.value}
          onBlur={blur}
          onInput={input}
        >
          {slots}
        </Input>
      );
  },
});
