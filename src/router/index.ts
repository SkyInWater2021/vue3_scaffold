import { createRouter, createWebHashHistory } from "vue-router"

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/home",
      name: "首页",
      meta: { title: "首页" },
      component: () => import(`@/views/home.vue`),
    },
  ],
})

export default router
