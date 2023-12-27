import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import { createTestPinia } from "./myPinia/pinia";
import { createPinia as myCreatePinia } from "./testPinia/pinia";
import { createPinia as createPinia1103 } from "./1103/pinia";

// function secretPlugin(context) {
//   console.log("🚀 ~ file: main.ts:6 ~ secretPlugin ~ context:", context);
//   return { secret: "hello" };
// }

const app = createApp(App);
const pinia = createPinia();
const testPinia = createTestPinia();
const testPinia2 = myCreatePinia();
const pinia1103 = createPinia1103();
// pinia.use(secretPlugin);
app.use(testPinia);
app.use(testPinia2);
app.use(pinia);
app.use(pinia1103);
app.mount("#app");
