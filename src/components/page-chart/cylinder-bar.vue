<script lang="ts" setup>
import { BaseEchart, echarts, type EChartsOption, type InitEchart } from "@/base-ui"
import { formatDate } from "@/utils"

interface PropsType {
  xData: string[]
  lineData: number[]
  barData: number[]
  barSpace: number
  lineSpace: number
  lineUnit?: string
  barUnit?: string
}
const props = defineProps<{ data: PropsType; barWidth?: number }>()

const chartInstance = ref<InitEchart["echartInstance"]>()
function getChartInstance(data: InitEchart) {
  chartInstance.value = data.echartInstance
}
const options = computed(() => {
  const { xData, lineData, barData, barSpace, lineSpace } = props.data
  const barWidth = props.barWidth ?? 20
  const barColor = ["#38B2E6", "#47639c"]
  const lineColor = "#5ce0e2"

  const legend = {
    data: [
      { name: "文件大小", color: barColor[0] },
      { name: "文件总量", color: lineColor },
    ],
    top: "1%",
  }

  const tooltip: EChartsOption["tooltip"] = {
    trigger: "axis",
    formatter: e => {
      const tempData = e as unknown as Record<string, number | string>[]
      const tBarData = tempData.find(item => item.seriesType === "bar")
      const tLineData = tempData.find(item => item.seriesType === "line")
      const date = xData[tBarData?.dataIndex as number] ?? xData[tLineData?.dataIndex as number]
      const line1 = `<div>日期：${formatDate(date ?? "", "YYYY-MM-DD HH") ?? "-"}</div>`
      const line2 = `<div>${tBarData?.marker}文件大小：${tBarData?.value} ${props.data.barUnit ?? ""}</div>`
      const line3 = `<div>${tLineData?.marker}文件总量：${tLineData?.value} ${props.data.lineUnit ?? ""}</div>`

      let target = ""
      if (date) target += line1
      if (tBarData) target += line2
      if (tLineData) target += line3

      return target
    },
  }

  const grid = { top: "15%", left: barSpace, right: lineSpace, bottom: "25" }

  const xAxis: EChartsOption["xAxis"] = {
    type: "category",
    offset: barWidth * 0.1,
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { show: false },
    data: xData?.map(item => item.slice(item.length - 2, item.length) || "-"),
  }

  const yAxis: EChartsOption["yAxis"] = [props.data?.barUnit, props.data?.lineUnit].map(
    (unit, index) => ({
      name: unit,
      nameTextStyle: { padding: [0, index === 0 ? 40 : -40, 0, 0] },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { type: [10, 10], dashOffset: 10, color: "#fff2" },
      },
    }),
  )

  const cylinderBarSeries: EChartsOption["series"] = [
    // 上圆柱
    {
      name: "文件大小",
      type: "pictorialBar",
      symbolOffset: [0, "-50%"],
      symbolSize: [barWidth, barWidth * 0.5],
      symbolPosition: "end",
      z: 2,
      color: "#2DB1EF",
      data: barData,
    },
    // 下圆柱
    {
      name: "文件大小",
      type: "pictorialBar",
      symbolOffset: [0, "50%"],
      symbolSize: [barWidth, barWidth * 0.5],
      color: "#59afe9",
      z: 2,
      data: barData,
    },
  ]

  const series: EChartsOption["series"] = [
    {
      name: "文件大小",
      type: "bar",
      barWidth: barWidth,
      z: 1,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [
          { offset: 0, color: barColor[0] },
          { offset: 1, color: barColor[1] },
        ]),
        opacity: 0.9,
      },
      data: barData,
    },
    {
      name: "文件总量",
      type: "line",
      yAxisIndex: 1,
      z: 3,
      data: lineData,
      symbolSize: 8,
      color: lineColor,
      itemStyle: {
        shadowColor: lineColor,
        shadowBlur: 10,
        borderColor: lineColor,
        borderWidth: 4,
      },
      lineStyle: {
        width: 4,
        color: lineColor,
        shadowColor: lineColor,
        shadowBlur: 10,
      },
    },
    ...cylinderBarSeries,
  ]

  return { legend, tooltip, grid, xAxis, yAxis, series }
})
</script>

<template>
  <BaseEchart height="100%" :option="options" @completed="getChartInstance" />
</template>
