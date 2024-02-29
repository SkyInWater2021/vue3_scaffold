<script lang="ts" setup>
const radioOptions = [
  {
    label: "Redis",
    monitorType: "redis", // 请求ip和Metric以及监控数据的拼接参数
    legendKey: "ip", // 监控数据图表的legend取值的key值
    classCode: "redis", // 获取Metric详情的拼接参数
    cpn: defineAsyncComponent(() => import("./c-cpns/ip-detail.vue")),
  },
  {
    label: "CPU",
    monitorType: "cpu",
    legendKey: "ip",
    classCode: "linux",
    cpn: defineAsyncComponent(() => import("./c-cpns/ip-detail.vue")),
  },
  {
    label: "内存",
    monitorType: "memory",
    legendKey: "ip",
    classCode: "linux",
    cpn: defineAsyncComponent(() => import("./c-cpns/ip-detail.vue")),
  },
  {
    label: "磁盘",
    monitorType: "disk",
    legendKey: "device",
    classCode: "linux",
    device: "group-device",
    cpn: defineAsyncComponent(() => import("./c-cpns/ip-detail.vue")),
  },
  {
    label: "磁盘分区",
    monitorType: "fdisk",
    legendKey: "device",
    classCode: "linux",
    device: "group-device",
    cpn: defineAsyncComponent(() => import("./c-cpns/ip-detail.vue")),
  },
  {
    label: "网络",
    monitorType: "network",
    legendKey: "device",
    classCode: "linux",
    device: "group-device",
    cpn: defineAsyncComponent(() => import("./c-cpns/ip-detail.vue")),
  },

  { label: "RMQ", cpn: defineAsyncComponent(() => import("./c-cpns/rmq-detail.vue")) },
  { label: "Flume", cpn: defineAsyncComponent(() => import("./c-cpns/flume-detail.vue")) },
]

const currentType = ref(radioOptions[0].label)

const currentContent = computed(() => {
  return radioOptions.find(item => item.label === currentType.value)
})
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="com-floodlit-box mb-2.5 flex items-center p-2.5">
      <el-radio-group v-model="currentType" class="mr-2.5">
        <el-radio v-for="option in radioOptions" :key="option.label" :label="option.label" border>
          {{ option.label }}
        </el-radio>
      </el-radio-group>
    </div>

    <div class="com-scrollbar-hide flex-1">
      <KeepAlive>
        <component :is="currentContent?.cpn" :option="{ ...currentContent, cpn: undefined }" />
      </KeepAlive>
    </div>
  </div>
</template>
