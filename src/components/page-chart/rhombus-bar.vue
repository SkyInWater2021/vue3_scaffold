<script lang="ts" setup>
import { BaseEchart, echarts, type EChartsOption } from "@/base-ui"
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

const options = computed(() => {
  const { xData, lineData, barData, barSpace, lineSpace } = props.data
  const barWidth = props.barWidth ?? 20
  const barColor = ["#73fcff", "#86eef1", "#5ad6d9", "#3dc8ca"]
  const lineColor = "#f8d88c"

  const legend = {
    data: [
      { name: "文件大小", icon: "diamond", itemStyle: { color: barColor[0] } },
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

  const seriesColor = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    { offset: 0, color: barColor[0] },
    { offset: 0.5, color: barColor[1] },
    { offset: 0.5, color: barColor[2] },
    { offset: 1, color: barColor[3] },
  ])

  const rhombusBarSeries: EChartsOption["series"] = [
    // 上菱形
    {
      name: "文件大小",
      data: barData,
      z: 3,
      type: "pictorialBar",
      symbolPosition: "end",
      symbol: "diamond",
      symbolOffset: [0, "-50%"],
      symbolSize: [barWidth, barWidth * 0.5],
      color: barColor[0],
    },
    // 下菱形
    {
      name: "文件大小",
      data: barData,
      z: 2,
      type: "pictorialBar",
      symbol: "diamond",
      symbolOffset: [0, "50%"],
      symbolSize: [barWidth, barWidth * 0.5],
      itemStyle: { color: seriesColor },
    },
  ]

  const series: EChartsOption["series"] = [
    {
      name: "文件大小",
      type: "bar",
      barWidth: barWidth,
      z: 1,
      itemStyle: { color: seriesColor, opacity: 0.9 },
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
    ...rhombusBarSeries,
  ]

  return { legend, tooltip, grid, xAxis, yAxis, series }
})
</script>

<template>
  <BaseEchart height="100%" :option="options" />
</template>
