import { RouteRecordRaw } from "vue-router"

import { useWeatherIcon } from "@/hooks"

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
    meta: { index: 1, title: "雷达", icon: useWeatherIcon("雷达") },
    component: () => import(`@/views/radar/RadarView.vue`),
  },
  {
    path: "/satellite",
    name: "卫星",
    meta: { index: 2, title: "卫星", icon: useWeatherIcon("卫星") },
    component: () => import(`@/views/satellite/SatelliteView.vue`),
  },
  {
    path: "/lighting-monitor",
    name: "雷电监测",
    meta: { index: 2, title: "雷电监测", icon: useWeatherIcon("闪电") },
    component: () => import(`@/views/lighting-monitor/LightingMonitor.vue`),
  },
]
