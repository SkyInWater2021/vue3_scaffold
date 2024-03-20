<script lang="ts" setup>
import { sizer } from "./config"
import { SizerForm } from "./types"

const sizerOptions = ref({
  area: getSizerOptions("area"),
  stationType: getSizerOptions("stationType"),
  timeOrder: getSizerOptions("timeOrder"),
  scale: getSizerOptions("scale"),
})

const formData = computed(
  (): SizerForm => ({
    area: sizerOptions.value.area[0]?.value,
    stationType: sizerOptions.value.stationType[0]?.value,
    timeOrder: sizerOptions.value.timeOrder[0]?.value,
    scale: sizerOptions.value.scale[0]?.value,
  }),
)

function getSizerOptions(name: string) {
  const sizerInfo = sizer.find(item => item.name === name)
  return sizerInfo?.options ?? []
}

defineExpose({
  formData,
})
</script>

<template>
  <van-dropdown-menu swipe-threshold="4">
    <van-dropdown-item v-model="formData.area" :options="sizerOptions.area" />
    <van-dropdown-item v-model="formData.stationType" :options="sizerOptions.stationType" />
    <van-dropdown-item v-model="formData.timeOrder" :options="sizerOptions.timeOrder" />
    <van-dropdown-item v-model="formData.scale" :options="sizerOptions.scale" />
  </van-dropdown-menu>
</template>

<style scoped>
:deep(.van-dropdown-menu__bar) {
  height: 32px;
}
</style>
