import { RouteRecordRaw } from "vue-router"

import { getMenuIcon } from "@/utils"

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
    path: "/live-monitor",
    name: "实况监测",
    meta: { title: "实况监测", icon: getMenuIcon("监测") },
    redirect: "/live-monitor/ground",
    children: [
      {
        path: "/live-monitor/ground",
        name: "实况监测-地面",
        meta: { title: "地面", icon: getMenuIcon("地面") },
        component: () => import(`@/views/live-monitor/ground/GroundView.vue`),
      },
      {
        path: "/live-monitor/radar",
        name: "实况监测-雷达",
        meta: { title: "雷达", icon: getMenuIcon("雷达") },
        component: () => import(`@/views/live-monitor/radar/RadarView.vue`),
      },
      {
        path: "/live-monitor/satellite",
        name: "实况监测-卫星",
        meta: { title: "卫星", icon: getMenuIcon("卫星") },
        component: () => import(`@/views/live-monitor/satellite/SatelliteView.vue`),
      },
      {
        path: "/live-monitor/lighting-monitor",
        name: "实况监测-雷电监测",
        meta: { title: "雷电监测", icon: getMenuIcon("闪电") },
        component: () => import(`@/views/live-monitor/lighting/LightingMonitor.vue`),
      },
    ],
  },

  {
    path: "/analysis",
    name: "天气分析",
    meta: { title: "天气分析", icon: getMenuIcon("天气") },
    redirect: "/analysis/ground",
    children: [
      {
        path: "/analysis/ground",
        name: "天气分析-地面",
        meta: { title: "地面", icon: getMenuIcon("地面") },
        component: () => import(`@/views/weather-analysis/ground/GroundView.vue`),
      },
      {
        path: "/analysis/high-rise",
        name: "天气分析-高空",
        meta: { title: "高空", icon: getMenuIcon("高空") },
        component: () => import(`@/views/weather-analysis/high-rise/highRise.vue`),
      },
    ],
  },

  // TODO 未开发的页面
  {
    path: "/forecast",
    name: "天气预报",
    meta: { title: "天气预报", icon: getMenuIcon("天气预报") },
    component: () => import("@/views/forecast/ForecastView.vue"),
  },

  {
    path: "/warning",
    name: "预警信息",
    meta: { title: "预警信息", icon: getMenuIcon("预警信息") },
    component: () => import("@/views/forecast/ForecastView.vue"),
  },

  {
    path: "/climate",
    name: "气候预测",
    meta: { title: "气候预测", icon: getMenuIcon("气候") },
    component: () => import("@/views/forecast/ForecastView.vue"),
  },

  {
    path: "/decision",
    name: "决策服务",
    meta: { title: "决策服务", icon: getMenuIcon("决策") },
    component: () => import("@/views/forecast/ForecastView.vue"),
  },
]
