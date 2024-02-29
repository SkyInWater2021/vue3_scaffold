<script lang="ts" setup>
import { systemStatusFRApi } from "@/services"
import type { FlumeLineResponseItem } from "@/services/system-status/types"
import { formatDate } from "@/utils"

import ChartLine from "../charts/flume-line.vue"

const props = defineProps<{ payload: Record<string, string> }>()

const types = [
  { label: "eventTakeSuccessCount", value: "eventTakeSuccessCount" },
  { label: "eventTakeAttemptCount", value: "eventTakeAttemptCount" },
  { label: "eventPutSuccessCount", value: "eventPutSuccessCount" },
  { label: "eventPutAttemptCount", value: "eventPutAttemptCount" },
  { label: "channelCapacity", value: "channelCapacity" },
  { label: "channelFillPercentage", value: "channelFillPercentage" },
  { label: "channelSize", value: "channelSize" },
]
const intervals = [
  { label: "1小时", value: 1 },
  { label: "2小时", value: 2 },
  { label: "5分钟", value: 5 },
  { label: "10分钟", value: 10 },
  { label: "30分钟", value: 30 },
]

const startTime = ref(
  import.meta.env.DEV
    ? new Date("2023-12-13 00:00:00").getTime()
    : Date.now() - 1000 * 60 * 60 * (24 + 8) * 7,
)

const fetchParams = reactive({
  end: new Date(startTime.value).getTime() + 1000 * 60 * 60 * 24,
  start: new Date(startTime.value).getTime(),
  flumeId: props.payload.flumeId,
  interval: intervals[0].value,
  interval_unit: "hours",
  linesType: types[0].value,
  channelName: props.payload.channelName,
})

const responseData = ref<FlumeLineResponseItem[]>()
const chartData = computed(() => {
  const lineData: Array<number | undefined | null> = []
  const xData: string[] = []
  const xTooltip: string[] = []
  const lineSpace = 50
  ;(responseData.value ?? []).forEach(item => {
    const date = formatDate(new Date(item.periodDate))
    if (date) {
      const DateStr =
        fetchParams.interval_unit === "hours" ? date.slice(11, 13) : date.slice(11, 16)
      xData.push(DateStr)
      xTooltip.push(date)
    } else {
      xData.push("-")
      xTooltip.push("-")
    }

    lineData.push(item.flumePct)
  })

  return { lineData, xData, lineSpace, xTooltip }
})

const fetchLoading = ref(true)
function fetchData() {
  fetchLoading.value = true

  systemStatusFRApi
    .queryThirdFlumeLineChart({ ...fetchParams })
    .then(res => {
      if (res.code === 200) {
        responseData.value = res.data
      }
    })
    .catch(error => console.error(error))
    .finally(() => (fetchLoading.value = false))
}

fetchData()

function changeStart() {
  fetchParams.start = new Date(startTime.value).getTime()
  fetchParams.end = fetchParams.start + 1000 * 60 * 60 * 24
  fetchData()
}

function changeInterval() {
  fetchParams.interval_unit = [1, 2].includes(fetchParams.interval) ? "hours" : "minutes"
  fetchData()
}
</script>

<template>
  <div class="">
    <div class="mt-2.5">
      <span>开始时间：</span>
      <el-date-picker
        v-model="startTime"
        type="datetime"
        format="YYYY-MM-DD HH:00"
        :clearable="false"
        @change="changeStart"
      />

      <span class="ml-4">间隔：</span>
      <el-select v-model="fetchParams.interval" class="!w-[100px]" @change="changeInterval">
        <el-option
          v-for="item in intervals"
          :key="item.label"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <span class="ml-4">要素类型：</span>
      <el-select v-model="fetchParams.linesType" class="!w-[200px]" @change="fetchData">
        <el-option
          v-for="item in types"
          :key="item.label"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>

    <div v-loading="fetchLoading" class="mt-5 h-[500px]">
      <ChartLine :data="[chartData]" :payload="fetchParams" />
    </div>
  </div>
</template>

<style>
.el-time-spinner {
  display: flex;
  justify-content: center;
}

.el-time-spinner__wrapper:nth-child(2) {
  display: none;
}

.el-time-spinner__wrapper:nth-child(3) {
  display: none;
}
</style>
