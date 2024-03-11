<script lang="ts" setup>
import { PageHeader, TimeLine } from "@/components"
import { dateFormat } from "@/utils"

import SatelliteMap from "./SatelliteMap.vue"
import { tabOptions } from "./config"

const timeLineRef = ref<InstanceType<typeof TimeLine>>()
const mapRef = ref<InstanceType<typeof SatelliteMap>>()

const currentTab = ref(tabOptions[0].name)
const currentSatelliteType = ref<string | number | undefined>()
const currentOptions = computed(() => {
  const option = tabOptions.find(item => item.name === currentTab.value)?.options ?? []
  currentSatelliteType.value = option[0].value
  return option
})

const ticks = ["11:10", "11:20", "11:30", "11:40", "11:50", "12:00", "12:10"]

const currentTickIndex = computed(() => timeLineRef.value?.currentTickIndex ?? 0)
</script>

<template>
  <div class="flex h-full flex-col">
    <PageHeader title="卫星云图" />

    <van-tabs v-model:active="currentTab" title-active-color="black" color="black" line-width="30">
      <van-tab v-for="tab in tabOptions" :title="tab.title" :name="tab.name" :key="tab.name">
        <van-dropdown-menu :duration="0">
          <van-dropdown-item v-model="currentSatelliteType" :options="currentOptions" />
        </van-dropdown-menu>
      </van-tab>
    </van-tabs>

    <div class="flex-1">
      <SatelliteMap ref="mapRef" :current-tick-index="currentTickIndex" />
    </div>

    <div class="absolute bottom-2 left-[2%] z-50 w-[96%] rounded bg-white">
      <TimeLine ref="timeLineRef" :ticks="ticks" />
      <div class="absolute right-0 top-[-24px] w-fit rounded bg-white px-2.5">
        <span> {{ dateFormat(new Date(), "YYYY-MM-DD HH:") }}</span>
        <span>{{ timeLineRef?.currentTick }}</span>
        <span> BJT </span>
      </div>
    </div>
  </div>
</template>

<style>
.van-tabs__line {
  bottom: 20px;
}

.van-dropdown-menu {
  --van-dropdown-menu-height: 32px;
  --van-dropdown-menu-title-font-size: 12px;

  position: absolute;
  top: 48px;
  right: 4px;
  z-index: 50;
  overflow: hidden;
  border-radius: 4px;
}

.van-dropdown-menu__item {
  padding: 0 16px 0 6px;
}

.van-overlay {
  background-color: transparent;
}

.van-dropdown-item__content {
  text-wrap: nowrap;
  width: fit-content;
}

.van-cell {
  padding: 5px 10px;
}

.van-cell__title {
  font-size: 12px;
}

.van-popup--top {
  top: 2px;
  right: 4px;
  left: auto;
}
</style>
