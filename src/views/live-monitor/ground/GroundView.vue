<script lang="ts" setup>
import { PageHeader } from "@/components"
import { dateOffset } from "@/utils"

import MapFilter from "./MapFilter.vue"
import GroundMap from "./MapGround.vue"
import MapSizer from "./MapSizer.vue"
import MapTab from "./MapTab.vue"

const sizerRef = ref<InstanceType<typeof MapSizer>>()
const tabRef = ref<InstanceType<typeof MapTab>>()
const filterRef = ref<InstanceType<typeof MapFilter>>()

const sizerData = computed(() => sizerRef.value?.formData)
</script>

<template>
  <div class="flex h-full flex-col">
    <PageHeader>
      <template #center>
        <div class="text-sm">四川省国家站降水观测数据</div>
        <div class="text-xs leading-[14px]">
          {{ dateOffset({ format: "YYYY年MM月DD日HH时" }) }}BJT
        </div>
        <div class="text-xs leading-[14px]">{{ tabRef?.currentClassifyText }}</div>
      </template>
    </PageHeader>

    <MapSizer ref="sizerRef" />
    <MapTab ref="tabRef" class="py-2" :sizerData="sizerData" />

    <div class="flex-1">
      <GroundMap />
    </div>

    <MapFilter ref="filterRef" />
  </div>
</template>
