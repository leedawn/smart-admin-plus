import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import { createTestPinia } from "./myPinia/pinia";
import { createPinia as myCreatePinia } from "./testPinia/pinia";

// function secretPlugin(context) {
//   console.log("🚀 ~ file: main.ts:6 ~ secretPlugin ~ context:", context);
//   return { secret: "hello" };
// }

const app = createApp(App);
const pinia = createPinia();
const testPinia = createTestPinia();
const testPinia2 = myCreatePinia();
// pinia.use(secretPlugin);
app.use(testPinia);
app.use(testPinia2);
app.use(pinia);
app.mount("#app");
