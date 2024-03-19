import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

import { homeRoutes } from "./home-route"

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "首页",
      meta: { title: "首页" },
      component: () => import(`@/views/home/HomeView.vue`),
    },
    { path: "/:pathMatch(.*)", component: () => import("@/views/404/NotFound.vue") },
    ...(homeRoutes as unknown as RouteRecordRaw[]),
  ],
})

export default router
