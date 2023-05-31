import { defineComponent } from "vue";
import { Modal } from "ant-design-vue";
import "ant-design-vue/es/modal/style/css";

export default defineComponent({
  name: "UModal",
  props: ["visible"],
  emits: ["update:visible"],
  inheritAttrs: false,
  setup(props, { emit, slots, attrs }) {
    return () => (
      <>
        <Modal
          {...attrs}
          visible={props.visible}
          onUpdate:visible={() => emit("update:visible", !props.visible)}
        >
          {slots.default()}
        </Modal>
      </>
    );
  },
});
