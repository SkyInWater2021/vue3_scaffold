<script lang="ts" setup>
import { ContentTitle, FetchTime } from "@/components"
import { useBaseChart } from "@/hooks/use-chart"
import type { LiveTransItem } from "@/services/live-transmit/types"
import type { GlobalResponse } from "@/types"
import { dateOffset, numberToTenThousand } from "@/utils"

const props = defineProps<{
  title: string
  chart: Component
  api: () => Promise<GlobalResponse<LiveTransItem[]>> | undefined
}>()

const { getAxisMax, changeDataToUnit } = useBaseChart()
const chartData = computed(() => {
  const xData: string[] = [] // x轴数据
  const barTempData: number[] = [] // 柱状图数据
  const lineData: Array<number | undefined> = [] // 折线图数据
  responseData.value?.forEach(item => {
    xData.push(String(item.PERIOD_DATE ?? ""))
    barTempData.push(item.FILESIZE_COUNT)
    lineData.push(numberToTenThousand(item.FILE_COUNT))
  })

  const barMax = getAxisMax(barTempData)
  const lineMax = getAxisMax(lineData)
  let barSpace = 40

  let lineUnit = "万"
  let barUnit = ""

  const barData = barTempData.map(item => {
    const res = changeDataToUnit(item, barMax.max, "B")
    if (!barUnit) {
      barUnit = res?.unit ?? ""
      barSpace = res?.space ?? 40
    }
    return res?.value
  })

  return {
    xData,
    lineData,
    barData,
    lineUnit,
    barUnit,
    barSpace: barSpace,
    lineSpace: lineMax.space,
  }
})

// ==== 获取接口数据 =====
const responseData = ref<LiveTransItem[]>()
const fetchTime = ref<string>()
const fetchLoading = ref(false)
async function fetchData() {
  if (!props.api) return

  responseData.value = []
  fetchLoading.value = true
  props
    .api()
    ?.then(res => {
      if (res.code === 200) {
        responseData.value = res?.data?.reverse() ?? []
        fetchTime.value = dateOffset({ utc: true, format: "HH:mm:ss" })
        getBarWidth()
      }
    })
    .catch(error => error)
    .finally(() => (fetchLoading.value = false))
}

// ===== 全屏逻辑 =====
const isFullScreen = ref(false)
const chartContainerRef = ref<HTMLDivElement>()
function changeScreen(visible: boolean) {
  isFullScreen.value = visible
  if (isFullScreen.value) document.addEventListener("keydown", keydownEsc)
  else document.removeEventListener("keydown", keydownEsc)
  getBarWidth()
}
function keydownEsc(event: KeyboardEvent) {
  if (event.code === "Escape") changeScreen(false)
}

// ===== 获取柱状图柱子宽度 =====
const barWidth = ref<number>()
async function getBarWidth() {
  await nextTick() // 等待父容器加载完成
  const width = chartContainerRef.value?.clientWidth ?? 100
  barWidth.value = Math.min(width / chartData.value.xData.length / 1.5, 40)
}

onMounted(() => fetchData())
</script>

<template>
  <Teleport :disabled="!isFullScreen" to="body">
    <div
      class="flex h-full flex-col"
      :class="{ 'com-floodlit-box absolute inset-0 z-10  p-10': isFullScreen }"
    >
      <ContentTitle>
        <div class="flex items-center justify-between">
          <div>{{ title }}</div>

          <div class="flex-1"><slot name="condition" /></div>

          <FetchTime :loading="fetchLoading" @refresh="fetchData" :time="fetchTime" width="160px">
            <IconEpCircleClose
              v-if="isFullScreen"
              class="ml-2.5 cursor-pointer"
              :disabled="fetchLoading"
              @click="changeScreen(!isFullScreen)"
            />
            <IconEpFullScreen
              v-else
              class="ml-2.5 cursor-pointer"
              :disabled="fetchLoading"
              @click="changeScreen(!isFullScreen)"
            />
          </FetchTime>
        </div>
      </ContentTitle>

      <div v-loading="fetchLoading" class="flex-1" ref="chartContainerRef">
        <component :is="chart" :data="chartData" :barWidth="barWidth" />
      </div>
    </div>
  </Teleport>
</template>
