import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: () => import("../views/demos/default.vue") },
    { path: "/grid", component: () => import("../views/demos/grid.vue") },
    {
      path: "/timeline",
      component: () => import("../views/practice/timeline.vue"),
    },
  ],
});

export default router;
