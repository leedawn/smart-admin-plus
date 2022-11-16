import { defineComponent, ref } from "vue";
import { Button } from "ant-design-vue";
import "ant-design-vue/es/button/style/css";

export default defineComponent({
  name: "AsyncButton",
  props: {
    stop: {
      type: Boolean,
      default: false,
    },
    click: {
      type: Function,
    },
  },
  inheritAttrs: false,
  //   emits: ["click"],
  setup(props, { attrs, emit, slots }) {
    const loading = ref(false);

    async function click(event) {
      props.stop && event.propagation;
      loading.value = true;
      try {
        await props.click();
      } finally {
        loading.value = false;
      }
    }

    return () => (
      <Button {...attrs} loading={loading.value} onClick={click}>
        {slots}
      </Button>
    );
  },
});
