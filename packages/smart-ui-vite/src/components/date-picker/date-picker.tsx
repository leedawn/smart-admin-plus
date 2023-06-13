import { defineComponent, ref } from "vue";
import { DatePicker, RadioGroup, Radio, TimePicker } from "ant-design-vue";
import "ant-design-vue/es/date-picker/style/css";
import "ant-design-vue/es/radio/style/css";
import type { Dayjs } from "dayjs";
import { PickerMode } from "ant-design-vue/es/vc-picker/interface";

export default defineComponent({
  name: "UDatePicker",
  //   props: {
  //     stop: {
  //       type: Boolean,
  //       default: false,
  //     },
  //     click: {
  //       type: Function,
  //     },
  //   },
  inheritAttrs: false,
  setup(props, { attrs, slots }) {
    const date = ref<Dayjs>();
    const pickerType = ref<PickerMode | "date">("year");

    return () => (
      <div>
        <RadioGroup v-model:value={pickerType.value}>
          <Radio value="year">年</Radio>
          <Radio value="month">月</Radio>
          <Radio value="">日期</Radio>
          <Radio value="time">时分秒</Radio>
          <Radio value="date">年月日时分秒</Radio>
          <Radio value="week">周</Radio>
        </RadioGroup>
        {pickerType.value !== "time" ? (
          <DatePicker
            v-model:value={date.value}
            picker={pickerType.value}
            format={pickerType.value === "date" && "YYYY-MM-DD HH:mm:ss"}
            showTime={pickerType.value === "date"}
          ></DatePicker>
        ) : (
          <TimePicker />
        )}
      </div>
    );
  },
});
