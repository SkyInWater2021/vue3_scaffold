<script lang="ts" setup>
import { BaseEchart, EChartsOption } from "@/base-ui"
import { addCommasToNumber, formatDate } from "@/utils"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const props = defineProps<{ data: any; type: "size" | "count" | "singleSize" | "singleCount" }>()

const axisData = computed(() => {
  const xAxisData = Object.keys(props.data ?? {}).filter(key => key !== "type")
  const yData = xAxisData.map(key => {
    return props.data[key]?.[props.type] ?? null
  })

  return { yData, xAxisData }
})

const option = computed(() => {
  const finalOption: EChartsOption = {
    grid: { top: "2px", left: "2px", right: "2px", bottom: "2px" },
    tooltip: {
      trigger: "axis",
      appendToBody: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (p: any) => {
        const { marker, value, axisValue } = p[0]
        const date = `<div>${marker} 日期: ${formatDate(axisValue ?? "", "YYYY-MM-DD HH") ?? "-"}</div>`
        const byteSize = `<div> ${marker} 大小: ${addCommasToNumber(value) ?? "-"} Byte</div>`
        const count = `<div> ${marker} 数量: ${addCommasToNumber(value) ?? "-"} 个</div>`

        let target = date
        if (props.type === "count") target = date + count
        if (props.type === "size") target = date + byteSize
        return target
      },
    },
    xAxis: {
      type: "category",
      show: false,
      data: axisData.value.xAxisData,
    },
    yAxis: { show: false },
    series: {
      type: "line",
      color: "#699af1",
      symbol: "circle",
      symbolSize: 0,
      data: axisData.value.yData,
      markPoint: {
        symbolSize: 6,
        symbol: "circle",
        label: { show: false },
        data: [
          { type: "max", name: "Max", itemStyle: { color: "red" } },
          { type: "min", name: "Min", itemStyle: { color: "yellow" } },
        ],
      },
    },
  }

  return finalOption
})
</script>

<template>
  <div class="flex h-full items-center" v-if="axisData.xAxisData.length > 0">
    <BaseEchart width="100%" height="40px" :option="option" />
  </div>
</template>
