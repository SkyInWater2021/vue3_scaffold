<script lang="ts" setup>
import { BaseEchart, type EChartsOption, type InitEchart } from "@/base-ui"

interface PropsType {
  xData: string[]
  xTooltip: string[]
  lineData: Array<number | undefined | null>
  lineSpace: number
}

const props = defineProps<{ data: PropsType[]; payload: Record<string, string | number> }>()

const chartInstance = ref<InitEchart["echartInstance"]>()
function getChartInstance(data: InitEchart) {
  chartInstance.value = data.echartInstance
}

const chartOption = computed(() => {
  const { xData, xTooltip } = props.data[0]

  const maxLineSpace = props.data.reduce((max, item) => {
    return item.lineSpace > max ? item.lineSpace : max
  }, 0)

  const lineColor = ["#5ce0e2", "#f8d88c", "#f0c4c9", "#5daeec", "#6e60b9"]

  const grid = { top: 30, left: maxLineSpace, right: 10, bottom: 25 }

  const tooltip: EChartsOption["tooltip"] = {
    trigger: "axis",
    confine: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatter: (e: any) => {
      const { dataIndex, marker, value } = e[0]
      const dateLine = `<div>${marker} 时间: ${xTooltip[dataIndex]}</div>`
      const valueLine = `<div>${marker} ${props.payload.linesType}: ${value}</div>`
      return dateLine + valueLine
    },
  }

  const xAxis: EChartsOption["xAxis"] = {
    type: "category",
    axisLine: { show: true },
    axisTick: { show: false },
    splitLine: { show: false },
    data: xData,
  }

  const yAxis: EChartsOption["yAxis"] = {
    name: "",
    nameTextStyle: { padding: [0, 40, 0, 0] },
    axisLine: { show: true },
    axisTick: { show: false },
    splitLine: {
      lineStyle: { type: [10, 10], dashOffset: 10, color: "#fff2" },
    },
  }

  const series: EChartsOption["series"] = props.data.map((item, index) => ({
    type: "line",
    data: item.lineData as number[],
    symbolSize: 8,
    color: lineColor[index],
    itemStyle: {
      shadowColor: lineColor[index],
      shadowBlur: 10,
      borderColor: lineColor[index],
      borderWidth: 4,
    },
    lineStyle: {
      width: 4,
      color: lineColor[index],
      shadowColor: lineColor[index],
      shadowBlur: 10,
    },
  }))

  return { tooltip, grid, xAxis, yAxis, series }
})
</script>

<template>
  <BaseEchart height="100%" :option="chartOption" @completed="getChartInstance" />
</template>
