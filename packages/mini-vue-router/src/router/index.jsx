import { createRouter, createWebHashHistory, createWebHistory } from "../vue-router";
// @ts-ignore
import Home from "../views/Home.vue";
// @ts-ignore
import About from "../views/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      // @ts-ignore
      { path: "a", component: { render: () => <h1>a页面</h1> } }, // jsx 语法
      // @ts-ignore
      { path: "b", component: { render: () => <h1>b页面</h1> } },
    ],
    // @ts-ignore
    beforeEnter(to, from, next) {
      console.log("before enter");
    },
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  // mode
  history: createWebHashHistory(),
  routes,
});

// @ts-ignore
router.beforeEach((to, from, next) => {
  console.log("beforeEach");
});

// @ts-ignore
router.beforeResolve((to, from, next) => {
  console.log("beforeResove");
});

// @ts-ignore
router.afterEach((to, from, next) => {
  console.log("afterEach");
});

export default router;
