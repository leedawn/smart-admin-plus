import { defineComponent, onBeforeMount, ref } from "vue";
import { Tooltip } from "ant-design-vue";
import "ant-design-vue/es/tooltip/style/css";
import { createFromIconfontCN } from "@ant-design/icons-vue";

export default defineComponent({
  name: "UIcon",
  props: {
    type: {
      type: String,
      required: true,
    },
    tooltip: {
      type: String,
    },
  },
  inheritAttrs: false,

  setup(props) {
    let IconFont = ref(null);
    onBeforeMount(async () => {
      if (props.type.startsWith("icon-")) {
        IconFont.value = createFromIconfontCN({
          scriptUrl: "//at.alicdn.com/t/c/font_2053704_a3u0vixy1wo.js",
        });
      } else {
        const module = await import("@ant-design/icons-vue");
        const componentName = props.type
          .split("-")
          .map((item) => item.replace(/( |^)[a-z]/g, (L) => L.toUpperCase()))
          .join("");

        if (module[componentName]) {
          IconFont.value = module[componentName];
        }
      }
    });
    return () => (
      <Tooltip title={props.tooltip}>
        {<IconFont.value type={props.type.startsWith("icon-") && props.type} />}
      </Tooltip>
    );
  },
});
