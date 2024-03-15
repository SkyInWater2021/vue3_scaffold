<script lang="ts" setup>
import CME2D from "CME2D"
import { Map } from "ol"

import { CHENG_DU_LON_LAT, TDT_GRAPH } from "@/global"

const emit = defineEmits<{ loaded: [instance: Map] }>()

const MAP_CONTAINER = "SatelliteMapId"

function initCMEMap() {
  const instance = new CME2D({
    target: MAP_CONTAINER,
    view: {
      projection: "EPSG:4326",
      extent: [30, -30.5, 160, 80], // 世界范围限制
      zoom: 2,
      minZoom: 1,
      center: [...CHENG_DU_LON_LAT],
    },
    baseLayers: [TDT_GRAPH],
  })

  emit("loaded", instance)
}

onMounted(() => initCMEMap())
</script>

<template>
  <div :id="MAP_CONTAINER" class="h-full"></div>
</template>
