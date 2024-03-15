<script lang="ts" setup>
import CME2D from "CME2D"

import { CHENG_DU_LON_LAT, TDT_CIA, TDT_GRAPH, TDT_ST } from "@/global"

const emit = defineEmits<{
  loaded: [instance: any]
}>()

const MAP_CONTAINER = "GroundMapId"

function initCMEMap() {
  const instance = new CME2D({
    target: MAP_CONTAINER,
    view: {
      projection: "EPSG:4326",
      extent: [30, -30.5, 160, 80], // 中国范围限制
      zoom: 6,
      minZoom: 1,
      center: [...CHENG_DU_LON_LAT],
    },
    baseLayers: [TDT_GRAPH, TDT_ST, TDT_CIA],
  })

  emit("loaded", instance)
}

onMounted(() => initCMEMap())
</script>

<template>
  <div :id="MAP_CONTAINER" class="map-wrapper h-full"></div>
</template>
