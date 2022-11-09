import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: () => import("../views/default.vue") },
    { path: "/timeline", component: () => import("../views/timeline.vue") },
  ],
});

export default router;
