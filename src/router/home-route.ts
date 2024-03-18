import { RouteRecordRaw } from "vue-router"

import { useMenuIcon } from "@/hooks"

interface RouteMeta {
  title: string
  icon: string
  [key: string]: any
}

export interface ExtendedRouteRecordRaw extends Omit<RouteRecordRaw, "meta" | "children"> {
  meta: RouteMeta
  children?: ExtendedRouteRecordRaw[]
}

export const homeRoutes: ExtendedRouteRecordRaw[] = [
  {
    path: "/-",
    name: "实况监测",
    meta: { title: "实况监测", icon: useMenuIcon("监测") },
    redirect: "/radar",
    children: [
      {
        path: "/radar",
        name: "雷达",
        meta: { title: "雷达", icon: useMenuIcon("雷达") },
        component: () => import(`@/views/actual-monitor/radar/RadarView.vue`),
      },
      {
        path: "/satellite",
        name: "卫星",
        meta: { title: "卫星", icon: useMenuIcon("卫星") },
        component: () => import(`@/views/actual-monitor/satellite/SatelliteView.vue`),
      },
      {
        path: "/lighting-monitor",
        name: "雷电监测",
        meta: { title: "雷电监测", icon: useMenuIcon("闪电") },
        component: () => import(`@/views/actual-monitor/lighting-monitor/LightingMonitor.vue`),
      },
    ],
  },

  {
    path: "/analysis",
    name: "天气分析",
    meta: { title: "天气分析", icon: useMenuIcon("天气") },
    redirect: "/ground",
    children: [
      {
        path: "/ground",
        name: "地面",
        meta: { title: "地面", icon: useMenuIcon("地面") },
        component: () => import(`@/views/weather-analysis/ground/GroundView.vue`),
      },
      {
        path: "/high-rise",
        name: "高空",
        meta: { title: "高空", icon: useMenuIcon("高空") },
        component: () => import(`@/views/weather-analysis/high-rise/highRise.vue`),
      },
    ],
  },

  // TODO 未开发的页面
  {
    path: "/forecast",
    name: "天气预报",
    meta: { title: "天气预报", icon: useMenuIcon("天气预报") },
    component: () => import("@/views/forecast/ForecastView.vue"),
  },

  {
    path: "/warning",
    name: "预警信息",
    meta: { title: "预警信息", icon: useMenuIcon("预警信息") },
    component: () => import("@/views/forecast/ForecastView.vue"),
  },

  {
    path: "/climate",
    name: "气候预测",
    meta: { title: "气候预测", icon: useMenuIcon("气候") },
    component: () => import("@/views/forecast/ForecastView.vue"),
  },

  {
    path: "/decision",
    name: "决策服务",
    meta: { title: "决策服务", icon: useMenuIcon("决策") },
    component: () => import("@/views/forecast/ForecastView.vue"),
  },
]
