<script lang="ts" setup>
import { PageHeader, TimeLine } from "@/components"
import { dateFormat } from "@/utils"

import SatelliteMap from "./MapSatellite.vue"
import { tabOptions } from "./config"

const timeLineRef = ref<InstanceType<typeof TimeLine>>()
const mapRef = ref<InstanceType<typeof SatelliteMap>>()

const currentTab = ref(tabOptions[0].name)
const currentSatelliteType = ref<string | number | undefined>(findTabOptions()[0]?.value)

// 当前下拉选项
const currentOptions = computed(() => {
  const options = findTabOptions()
  currentSatelliteType.value = options[0].value
  return options
})
function findTabOptions() {
  return tabOptions.find(item => item.name === currentTab.value)?.options ?? []
}

const ticks = ["11:10", "11:20", "11:30", "11:40", "11:50", "12:00", "12:10"]
const currentTickIndex = computed(() => timeLineRef.value?.currentTickIndex ?? 0)

const showPicker = ref(false)
function changePickerVisible(visible: boolean) {
  showPicker.value = visible
}
function handleConfirm({ selectedOptions }: any) {
  currentSatelliteType.value = selectedOptions[0].value
  changePickerVisible(false)
}
</script>

<template>
  <div class="flex h-full flex-col">
    <PageHeader title="卫星云图" />

    <van-tabs v-model:active="currentTab" title-active-color="black" color="black" line-width="30">
      <van-tab v-for="tab in tabOptions" :title="tab.title" :name="tab.name" :key="tab.name" />
    </van-tabs>

    <div class="flex-1">
      <SatelliteMap ref="mapRef" :current-tick-index="currentTickIndex" />
    </div>

    <div class="absolute right-2 top-[12vh]">
      <van-button size="small" @click="changePickerVisible(true)" icon-position="right">
        {{ currentSatelliteType }}
        <template #icon>
          <van-icon name="label" color="var(--global-blue)" />
        </template>
      </van-button>
      <van-popup v-model:show="showPicker" position="bottom">
        <van-picker
          :columns="currentOptions"
          @confirm="handleConfirm"
          @cancel="changePickerVisible(false)"
        />
      </van-popup>
    </div>

    <div class="absolute bottom-2 left-[2%] z-[9] w-[96%] rounded bg-white">
      <TimeLine ref="timeLineRef" :ticks="ticks" />
      <div class="absolute right-0 top-[-24px] w-fit rounded bg-white px-2.5">
        <span> {{ dateFormat(new Date(), "YYYY-MM-DD HH:") }}</span>
        <span>{{ timeLineRef?.currentTick }}</span>
        <span> BJT </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 标签页 */
:deep(.van-tabs__line) {
  bottom: 20px;
}
</style>
