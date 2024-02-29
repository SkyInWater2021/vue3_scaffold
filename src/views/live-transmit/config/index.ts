import { liveTransApi } from "@/services"

export const cpnsMap = {
  fileChart: [
    {
      title: "24小时收集",
      class: "mb-2.5",
      api: liveTransApi.fetchCol24,
      cpn: defineAsyncComponent(() => import("@/components/page-chart/cylinder-bar.vue")),
    },
    {
      title: "24小时分发",
      class: "mb-2.5",
      api: liveTransApi.fetchDist24,
      cpn: defineAsyncComponent(() => import("@/components/page-chart/rhombus-bar.vue")),
    },
    {
      title: "30天收集",
      class: "mt-2.5",
      api: liveTransApi.fetchCol30,
      cpn: defineAsyncComponent(() => import("@/components/page-chart/cylinder-bar.vue")),
    },
    {
      title: "30天分发",
      class: "mt-2.5",
      api: liveTransApi.fetchDist30,
      cpn: defineAsyncComponent(() => import("@/components/page-chart/rhombus-bar.vue")),
    },
  ],
}
