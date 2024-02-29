<script lang="ts" setup>
const radioOptions = [
  {
    label: "IP详情",
    cpn: defineAsyncComponent(() => import("./ip-detail.vue")),
  },
  {
    label: "Redis",
    cpn: defineAsyncComponent(() => import("./ip-redis.vue")),
  },
  {
    label: "RMQ",
  },
  {
    label: "Flume",
  },
  {
    label: "CPU",
  },
  {
    label: "内存",
  },
  {
    label: "IO",
  },
  {
    label: "网络",
  },
  {
    label: "磁盘使用量",
  },
]

const currentType = ref(radioOptions[0].label)
const currentContent = computed(() => {
  return radioOptions.find(item => item.label === currentType.value)
})
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="com-floodlit-box mb-2.5 flex items-start p-2.5">
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
