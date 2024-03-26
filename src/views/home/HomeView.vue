<script lang="ts" setup>
import { PageHeader } from "@/views/components"

import WeatherAnalysis from "./WeatherAnalysis.vue"
import WeatherLive from "./WeatherLive.vue"
</script>

<template>
  <div class="flex h-full flex-col bg-[#5677a6cc]">
    <PageHeader class="!bg-transparent">
      <template #left><van-icon name="plus" :size="22" /></template>

      <template #right>
        <van-icon name="scan" :size="22" class="mr-2" />
        <van-icon name="setting-o" :size="22" />
      </template>
    </PageHeader>

    <div class="pb-2.5"><WeatherLive /></div>

    <div class="flex-1 overflow-scroll bg-white py-2.5">
      <WeatherAnalysis />
    </div>
  </div>
</template>

<style scoped>
.tab-item {
  position: relative;
}

.tab-item::after {
  position: absolute;
  bottom: -3px;
  left: -5%;
  width: 110%;
  height: 2px;
  background: white;
  content: "";
}

:deep(.van-swipe__indicators) {
  top: 0;
}
</style>
