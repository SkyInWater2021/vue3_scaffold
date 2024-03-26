<script lang="ts" setup>
import { dateFormat } from "@/utils/format-date"
import { PageHeader, TimeShaft } from "@/views/components"

import SatelliteMap from "./SatelliteMap.vue"
import { tabOptions } from "./config"

const timeLineRef = ref<InstanceType<typeof TimeShaft>>()

const currentTab = ref(tabOptions[0].name)
const currentSatelliteType = ref<string | number | undefined>(findTabOptions()[0]?.value)
const currentOptions = computed(findTabOptions)

function findTabOptions() {
  const tabInfo = tabOptions.find(item => item.name === currentTab.value)
  return tabInfo?.options ?? []
}
function handleTabChange() {
  timeLineRef.value?.stop()
  currentSatelliteType.value = findTabOptions()[0]?.value
}

const ticks = ["11:10", "11:20", "11:30", "11:40", "11:50", "12:00", "12:10"]
const currentTickIndex = ref(0)

const showPicker = ref(false)
function changePickerVisible(visible: boolean) {
  timeLineRef.value?.stop()
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

    <van-tabs
      v-model:active="currentTab"
      title-active-color="black"
      color="black"
      line-width="30"
      @change="handleTabChange"
    >
      <van-tab v-for="tab in tabOptions" :title="tab.title" :name="tab.name" :key="tab.name" />
    </van-tabs>

    <div class="flex-1">
      <SatelliteMap v-model="currentTickIndex" />
    </div>

    <!-- * picker -->
    <div class="absolute right-2 top-[12vh]">
      <van-button size="small" @click="changePickerVisible(true)" icon-position="right">
        {{ currentSatelliteType }}
        <template #icon>
          <van-icon name="label" color="var(--van-blue)" />
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

    <!-- * tick -->
    <div class="absolute bottom-2 left-[2%] z-[99] w-[96%] rounded bg-white">
      <TimeShaft ref="timeLineRef" v-model="currentTickIndex" :ticks="ticks" />
      <div class="absolute right-0 top-[-24px] w-fit rounded bg-white px-2.5">
        <span> {{ dateFormat(new Date(), "YYYY-MM-DD HH:") }}</span>
        <span>{{ ticks[currentTickIndex] }}</span>
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
