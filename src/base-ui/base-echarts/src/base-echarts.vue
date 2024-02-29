<script setup lang="ts">
import { useEchart } from "../hooks/use-echart"
import { echarts } from "../index"

import type { InitEchart } from "../types"

interface BaseEchartProps {
  height?: string
  width?: string
  option: echarts.EChartsOption
}

const props = withDefaults(defineProps<BaseEchartProps>(), { width: "100%", height: "100%" })

const echartContainerRef = ref<HTMLDivElement | null>(null)
const emit = defineEmits<{ completed: [res: InitEchart] }>()

onMounted(() => {
  if (!echartContainerRef.value) return

  const res = useEchart(echartContainerRef.value)
  watchEffect(() => res.setOptions(props.option))

  emit("completed", res)
})
</script>

<template>
  <div ref="echartContainerRef" :style="{ width, height }"></div>
</template>
