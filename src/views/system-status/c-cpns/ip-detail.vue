<script lang="ts" setup>
import { ShineCard } from "@/components"
import { systemStatusApi } from "@/services"

import IpBaseChart from "./ip-base-chart.vue"

const props = defineProps<{ option: Record<string, string> }>()

const ipOptions = ref<string[]>([])
const metricOptions = ref<string[]>([])

async function fetchPayload() {
  ipOptions.value = []
  metricOptions.value = []

  if (import.meta.env.DEV) {
    const res1 = await import("@/views/a-json/3.8.3.redis.ip列表.json")
    const res2 = await import("@/views/a-json/3.8.3.redis.参数列表.json")
    const ips = res1.data?.split(",") ?? []
    const metrics = res2.data?.split(",") ?? []

    ipOptions.value.push(ips[0])
    metricOptions.value.push(...metrics)

    // 模拟懒加载
    let ipIndex = 1
    const intervalId = setInterval(() => {
      const currentIp = ips[ipIndex]
      if (currentIp !== undefined) {
        ipOptions.value.push(currentIp)
        ipIndex++
      } else clearInterval(intervalId)
    }, metrics.length * 500)

    return
  }

  try {
    const [redisIpListResponse, redisMetricListResponse] = await Promise.all([
      systemStatusApi.fetchIpList(props.option.monitorType),
      systemStatusApi.fetchMetricList(props.option.monitorType),
    ])

    const metrics = redisMetricListResponse.data?.split(",") ?? []
    const ips = redisIpListResponse.data?.split(",") ?? []

    ipOptions.value.push(ips[0])
    metricOptions.value.push(...metrics)

    // 模拟懒加载
    let ipIndex = 1
    const intervalId = setInterval(() => {
      const currentIp = ips[ipIndex]
      if (currentIp !== undefined) {
        ipOptions.value.push(currentIp)
        ipIndex++
      } else clearInterval(intervalId)
    }, 1000)
  } catch (error) {
    console.error("Error fetching payload:", error)
  }
}

fetchPayload()
</script>

<template>
  <div class="flex flex-wrap justify-between">
    <template v-for="ip in ipOptions" :key="ip">
      <template v-for="metric in metricOptions" :key="metric">
        <ShineCard class="card-item">
          <IpBaseChart :currentIp="ip" :current-metric="metric" :option="option" />
        </ShineCard>
      </template>
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
