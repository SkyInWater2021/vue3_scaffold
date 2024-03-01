<script lang="ts" setup>
import { ShineCard } from "@/components"
import { systemStatusApi } from "@/services"
import { dateOffset } from "@/utils"

import { useFetchInfo } from "../use-fetch-info"

import MetricChart from "./metric-chart.vue"

const props = defineProps<{ option: Record<string, string>; code: Record<string, string> }>()

const metricOptions = ref<string[]>([])
const fetchTime = ref("")
const fetchLoading = ref(false)

async function fetchPayload() {
  metricOptions.value = []

  if (import.meta.env.DEV) {
    const res2 = await import("@/views/a-json/3.8.3.redis.参数列表.json")
    const metrics = res2.data?.split(",") ?? []
    metricOptions.value.push(...metrics)
    return
  }

  fetchLoading.value = true
  systemStatusApi
    .fetchMetricList(props.option.monitorType)
    .then(res => {
      const metrics = res.data?.split(",") ?? []
      metricOptions.value.push(...metrics)
      fetchLoading.value = false
      fetchTime.value = dateOffset({ utc: true, format: "HH:mm:ss" })
    })
    .catch(error => console.error(error))
    .finally(() => (fetchLoading.value = false))
}

useFetchInfo(fetchTime, fetchLoading, fetchPayload)
fetchPayload()
</script>

<template>
  <div class="flex flex-wrap justify-between" v-loading="fetchLoading">
    <template v-for="metric in metricOptions" :key="metric">
      <ShineCard class="card-item">
        <MetricChart :currentIp="code.hostIp" :current-metric="metric" :option="option" />
      </ShineCard>
    </template>
  </div>
</template>

<style scoped>
.card-item {
  width: calc(50% - 10px);
  height: 350px;
  margin-bottom: 20px;
}
</style>
