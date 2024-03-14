import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

import { homeRoutes } from "./home-route"

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/home",
      name: "首页",
      meta: { title: "首页" },
      component: () => import(`@/views/home/HomeView.vue`),
    },
    ...(homeRoutes as unknown as RouteRecordRaw[]),
  ],
})

export default router
