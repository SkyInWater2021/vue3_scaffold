import * as echarts from "echarts"

export interface InitEchart {
  echarts: typeof echarts
  echartInstance: echarts.ECharts
  setOptions: (options: echarts.EChartsOption) => void
  updateSize: () => void
}

export type EChartsOption = echarts.EChartsOption
