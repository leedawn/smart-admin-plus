import { createApp, ref, defineComponent } from "vue";

const App = defineComponent(function () {
  let count = ref(0);
  const inc = () => {
    console.log("🚀 ~ file: main.jsx:4 ~ App ~ App:", "hah");
    count.value++;
  };
  // @ts-ignore
  return () => <button onClick={inc}>{count.value}</button>;
});
createApp(App).mount("#app");
