<script lang="ts" setup>
import { BaseEchart, type EChartsOption, type InitEchart } from "@/base-ui"

interface PropsType {
  xData: string[]
  lineData: Array<number | undefined | null>
  lineSpace: number
  currentGroup: Record<string, string>
}

const props = defineProps<{
  data: PropsType[]
  currentIp: string
  currentMetric: string
  option: Record<string, string>
  metricDetail: Record<string, string> | undefined
  unit: string
}>()

const chartInstance = ref<InitEchart["echartInstance"]>()
function getChartInstance(data: InitEchart) {
  chartInstance.value = data.echartInstance
}

const chartOption = computed(() => {
  const xData = props.data[0]?.xData

  const maxLineSpace = props.data.reduce((max, item) => {
    return item.lineSpace > max ? item.lineSpace : max
  }, 0)

  const lineColor = ["#5ce0e2", "#f8d88c", "#f0c4c9", "#5daeec", "#6e60b9"]

  const legendData = props.data
    .map(item => item.currentGroup?.[props.option.legendKey ?? ""])
    .filter(Boolean)

  const legend: EChartsOption["legend"] = { data: legendData, top: 20, show: legendData.length > 1 }

  const grid = { top: legend.show ? 50 : 30, left: maxLineSpace, right: 10, bottom: 25 }

  const title: EChartsOption["title"] = {
    text: `IP: ${props.currentIp}    参数: ${props.data[0]?.currentGroup["metric_name"] ?? "-"}`,
    textStyle: { fontSize: 14 },
    textAlign: "center",
    top: 0,
    left: "50%",
  }

  const tooltip: EChartsOption["tooltip"] = {
    trigger: "axis",
    confine: true,
    formatter: e => {
      let target = ""
      let date = ""
      const matterData = e as unknown as Record<string, string>[]

      matterData.forEach(item => {
        const { marker, dataIndex, value, seriesName } = item ?? {}
        if (!date) date = `<div>${marker} 日期: ${xData[dataIndex as unknown as number]}</div>`
        const name = legendData.includes(seriesName) ? seriesName : props.currentIp

        target += `<div>${marker} ${name}: ${value} ${props.unit}</div>`
      })

      return date + target
    },
  }

  const xAxis: EChartsOption["xAxis"] = {
    type: "category",
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { show: false },
    data: xData?.map(item => item.split(" ")[1] || "-"),
  }

  const yAxisMaxValue =
    props.unit === "%" ? Math.max(Number(props.metricDetail?.max ?? 100), 100) : undefined

  const yAxis: EChartsOption["yAxis"] = {
    name: props.unit,
    nameTextStyle: { padding: [0, 40, 0, 0] },
    axisLine: { show: false },
    axisTick: { show: false },
    max: yAxisMaxValue,
    splitLine: {
      lineStyle: { type: [10, 10], dashOffset: 10, color: "#fff2" },
    },
  }

  const series: EChartsOption["series"] = props.data.map((item, index) => ({
    name: item.currentGroup?.[props.option.legendKey ?? ""],
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

  return { title, tooltip, grid, xAxis, yAxis, series, legend }
})
</script>

<template>
  <BaseEchart height="100%" :option="chartOption" @completed="getChartInstance" />
</template>
