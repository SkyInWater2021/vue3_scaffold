<script setup lang="ts">
import { ECOption } from "./echarts"
import { InitEchart } from "./types"
import { useChart } from "./use-chart"

interface BaseEchartProps {
  height?: string
  width?: string
  option: ECOption
}

const props = withDefaults(defineProps<BaseEchartProps>(), { width: "100%", height: "100%" })

const echartContainerRef = ref<HTMLDivElement | null>(null)
const emit = defineEmits<{ completed: [res: InitEchart] }>()

onMounted(() => {
  if (!echartContainerRef.value) return

  const res = useChart(echartContainerRef.value)
  watchEffect(() => res.setOptions(props.option))

  emit("completed", res)
})
</script>

<template>
  <div ref="echartContainerRef" :style="{ width, height }"></div>
</template>
