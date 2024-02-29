<script lang="ts" setup>
const radioOptions = [
  { label: "收集", cpn: defineAsyncComponent(() => import("./c-cpns/table-list-col.vue")) },
  { label: "分发", cpn: defineAsyncComponent(() => import("./c-cpns/table-list-dist.vue")) },
]

const currentType = ref(radioOptions[0].label)

const currentCpn = computed(() => {
  return radioOptions.find(item => item.label === currentType.value)?.cpn
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

    <div class="flex-1">
      <keep-alive>
        <component :is="currentCpn" />
      </keep-alive>
    </div>
  </div>
</template>
