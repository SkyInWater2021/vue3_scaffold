<script lang="ts" setup>
import { useSourceStore } from "@/store/source"

defineProps<{ code: Record<string, string> }>()

const sourceStore = useSourceStore()

const radioOptions = [
  {
    label: "IP详情",
    cpn: defineAsyncComponent(() => import("./ip-detail.vue")),
  },
  {
    label: "Redis",
    monitorType: "redis", // 请求ip和Metric以及监控数据的拼接参数
    legendKey: "ip", // 监控数据图表的legend取值的key值
    classCode: "redis", // 获取Metric详情的拼接参数
    cpn: defineAsyncComponent(() => import("./metric-option.vue")),
  },
  {
    label: "RMQ",
    cpn: defineAsyncComponent(() => import("./rmq-queue.vue")),
  },
  {
    label: "Flume",
    cpn: defineAsyncComponent(() => import("./flume-queue.vue")),
  },
  {
    label: "CPU",
    monitorType: "cpu",
    legendKey: "ip",
    classCode: "linux",
    cpn: defineAsyncComponent(() => import("./metric-option.vue")),
  },
  {
    label: "内存",
    monitorType: "memory",
    legendKey: "ip",
    classCode: "linux",
    cpn: defineAsyncComponent(() => import("./metric-option.vue")),
  },
  {
    label: "磁盘",
    monitorType: "disk",
    legendKey: "device",
    classCode: "linux",
    device: "group-device",
    cpn: defineAsyncComponent(() => import("./metric-option.vue")),
  },
  {
    label: "磁盘分区",
    monitorType: "fdisk",
    legendKey: "device",
    classCode: "linux",
    device: "group-device",
    cpn: defineAsyncComponent(() => import("./metric-option.vue")),
  },
  {
    label: "网络",
    monitorType: "network",
    legendKey: "device",
    classCode: "linux",
    device: "group-device",
    cpn: defineAsyncComponent(() => import("./metric-option.vue")),
  },
]

const currentType = ref(radioOptions[0].label)
const currentContent = computed(() => {
  return radioOptions.find(item => item.label === currentType.value)
})
watch(currentType, () => sourceStore.resetFetchInfo)
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="com-floodlit-box flex items-start px-2.5 pt-2.5">
      <el-radio-group v-model="currentType" class="mr-2.5">
        <el-radio
          v-for="option in radioOptions"
          :key="option.label"
          :label="option.label"
          border
          class="mb-2.5"
        >
          {{ option.label }}
        </el-radio>
      </el-radio-group>
    </div>

    <div class="com-scrollbar-hide flex-1">
      <KeepAlive>
        <component
          :is="currentContent?.cpn"
          :option="{ ...currentContent, cpn: undefined }"
          :code="code"
        />
      </KeepAlive>
    </div>
  </div>
</template>
