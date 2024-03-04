import { echarts, ECOption } from "./echarts"

export interface InitEchart {
  echarts: typeof echarts
  echartInstance: echarts.ECharts
  setOptions: (options: ECOption) => void
  updateSize: () => void
}
