import type { RouteRecordRaw } from "vue-router"

export const menuRoutes: RouteRecordRaw[] = [
  {
    path: "/source",
    name: "资源",
    meta: { title: "资源" },
    component: () => import(`@/views/source/index.vue`),
  },
  {
    path: "/nas",
    name: "NAS",
    meta: { title: "NAS" },
    component: () => import(`@/views/nas/index.vue`),
  },
  {
    path: "/strategy",
    name: "策略",
    meta: { title: "策略" },
    component: () => import(`@/views/strategy/index.vue`),
  },
  {
    path: "/live-trans",
    name: "实时传输",
    meta: { title: "实时传输" },
    component: () => import(`@/views/live-transmit/index.vue`),
  },
  {
    path: "/data-trans",
    name: "数据传输",
    meta: { title: "数据传输" },
    component: () => import(`@/views/data-transmit/index.vue`),
  },
  {
    path: "/yesterday-total",
    name: "昨日总量",
    meta: { title: "昨日总量" },
    component: () => import(`@/views/yesterday-total/index.vue`),
  },
  {
    path: "/healthy-degree",
    name: "健康度",
    meta: { title: "健康度" },
    component: () => import(`@/views/healthy-degree/index.vue`),
  },
  {
    path: "/system-status",
    name: "系统状态",
    meta: { title: "系统状态" },
    component: () => import(`@/views/system-status/index.vue`),
  },
  {
    path: "/warning-list",
    name: "告警列表",
    meta: { title: "告警列表" },
    component: () => import(`@/views/warning-list/index.vue`),
  },
]
