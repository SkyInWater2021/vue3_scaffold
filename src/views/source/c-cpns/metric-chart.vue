<script lang="ts" setup>
import { ContentTitle } from "@/components"
import { useBaseChart } from "@/hooks/use-chart"
import { systemStatusApi } from "@/services"
import type { MonitorItem } from "@/services/system-status/types"
import { dateOffset, fileSizeUnits, formatDate } from "@/utils"

import LineChart from "../charts/line-chart.vue"

const props = defineProps<{
  currentIp: string
  currentMetric: string
  option: Record<string, string>
}>()

const radioOptions = ["小时", "1分钟", "5分钟", "15分钟"]
const currentType = ref(radioOptions[0])
const currentMetricDetail = ref()
const currentUnit = ref("")

// ==== 获取接口数据 =====
const responseData = ref<MonitorItem[]>([])
const fetchTime = ref<string>()
const fetchLoading = ref(false)
async function fetchData() {
  // ===== 本地json =====
  if (import.meta.env.DEV) {
    const res = await (["disk", "network"].includes(props.option.monitorType)
      ? import("@/views/a-json/3.8.6.disk.磁盘.json")
      : import("@/views/a-json/3.8.3.redis.每5分钟.json"))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    responseData.value = res.data as unknown as any
    fetchTime.value = dateOffset({ utc: true, format: "HH:mm:ss" })
    return
  }

  try {
    fetchLoading.value = true
    responseData.value = []

    // ===== 请求参数详情 =====
    const detailResponse = await systemStatusApi.fetchMetricDetail(
      props.option.classCode,
      props.currentMetric,
    )
    if (detailResponse?.code === 200) {
      currentMetricDetail.value = detailResponse.data
      currentUnit.value = detailResponse.data?.unit ?? ""
    }

    // ===== 请求监控数据数据 =====
    const fetchFn = currentType.value.includes("分钟")
      ? systemStatusApi.fetchMinutesMonitor
      : systemStatusApi.fetchHourMonitor

    const res = await fetchFn({
      monitorType: props.option.monitorType ?? "",
      ip: props.currentIp,
      metric: props.currentMetric,
      minutes: parseInt(currentType.value),
      device: props.option.device,
    })

    if (res?.code === 200) {
      responseData.value = res?.data ?? []
      fetchTime.value = dateOffset({ utc: true, format: "HH:mm:ss" })
    }
    fetchLoading.value = false
  } catch (error) {
    fetchLoading.value = false
  }
}

const { getAxisMax, changeDataToUnit } = useBaseChart()
const chartData = computed(() => {
  const dateFormat = currentType.value.includes("分钟") ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD HH"

  return responseData.value.map(itemData => {
    const lineTempData: Array<number | undefined | null> = []
    const xData: string[] = []

    let currentGroup: Record<string, string> = {}
    if (itemData?.group) currentGroup = JSON.parse(itemData.group)

    const points = itemData?.points
    if (points) {
      const pointsObj = JSON.parse(points)
      Object.keys(pointsObj).forEach(key => {
        xData.push(formatDate(new Date(Number(key)), dateFormat) ?? "")
        lineTempData.push(pointsObj[key] as number)
      })
    }

    const { max } = getAxisMax(lineTempData)
    let lineSpace = 40
    const lineData = lineTempData.map(item => {
      if (fileSizeUnits.includes(currentUnit.value)) {
        const res = changeDataToUnit(item, max, currentUnit.value)
        if (!currentUnit.value) {
          currentUnit.value = res?.unit ?? ""
          lineSpace = res?.space ?? 40
        }

        return res?.value
      } else return item
    })

    return { xData, lineData, lineSpace, currentGroup }
  })
})

// ===== 全屏逻辑 =====
const isFullScreen = ref(false)
const chartContainerRef = ref<HTMLDivElement>()
function changeScreen(visible: boolean) {
  isFullScreen.value = visible
  if (isFullScreen.value) document.addEventListener("keydown", keydownEsc)
  else document.removeEventListener("keydown", keydownEsc)
}
function keydownEsc(event: KeyboardEvent) {
  if (event.code === "Escape") changeScreen(false)
}

fetchData()
</script>

<template>
  <Teleport :disabled="!isFullScreen" to="body">
    <div
      class="flex h-full flex-col"
      :class="{ 'com-floodlit-box absolute inset-0 z-10 p-10': isFullScreen }"
    >
      <ContentTitle>
        <div class="flex h-full items-center justify-between">
          <el-radio-group v-model="currentType" class="mr-2.5" @change="fetchData">
            <el-radio v-for="option in radioOptions" :key="option" :label="option">
              {{ option }}
            </el-radio>
          </el-radio-group>

          <FetchTime :loading="fetchLoading" @refresh="fetchData" :time="fetchTime" width="170px">
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
        <LineChart
          :data="chartData"
          :currentIp="currentIp"
          :currentMetric="currentMetric"
          :unit="currentUnit"
          :metricDetail="currentMetricDetail"
          :option="option"
        />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
:deep(.el-radio) {
  margin-right: 10px;
}
</style>
