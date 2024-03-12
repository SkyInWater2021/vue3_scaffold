import { RouteRecordRaw } from "vue-router"

import { useMenuIcon } from "@/hooks"

interface RouteMeta {
  title: string
  icon: string
  index: number
  [key: string]: any
}

interface ExtendedRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  meta: RouteMeta
}

export const homeRoutes: ExtendedRouteRecordRaw[] = [
  {
    path: "/radar",
    name: "雷达",
    meta: { index: 1, title: "雷达", icon: useMenuIcon("雷达") },
    component: () => import(`@/views/radar/RadarView.vue`),
  },
  {
    path: "/satellite",
    name: "卫星",
    meta: { index: 2, title: "卫星", icon: useMenuIcon("卫星") },
    component: () => import(`@/views/satellite/SatelliteView.vue`),
  },
  {
    path: "/lighting-monitor",
    name: "雷电监测",
    meta: { index: 2, title: "雷电监测", icon: useMenuIcon("闪电") },
    component: () => import(`@/views/lighting-monitor/LightingMonitor.vue`),
  },
  {
    path: "/ground",
    name: "地面",
    meta: { index: 2, title: "地面分析", icon: useMenuIcon("地面") },
    component: () => import(`@/views/ground/GroundView.vue`),
  },
]
