import { defineComponent, ref } from "vue";
import { Button, Modal } from "ant-design-vue";
import "ant-design-vue/es/modal/style/css";

export default defineComponent({
  name: "UModal",
  setup() {
    let visible = ref(false);

    return () => (
      <>
        <Button onClick={() => (visible.value = !visible.value)} type="primary">
          show
        </Button>
        <Modal
          visible={visible.value}
          onUpdate:visible={() => (visible.value = false)}
        >
          some content
        </Modal>
      </>
    );
  },
});
