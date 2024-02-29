import { createRouter, createWebHashHistory } from "vue-router"

import { menuRoutes } from "./menu-routes"

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/layout" },
    {
      path: "/layout",
      name: "cts3",
      redirect: menuRoutes[0].path,
      children: menuRoutes,
      component: () => import("@/layout/main-layout.vue"),
    },
  ],
})

export default router
