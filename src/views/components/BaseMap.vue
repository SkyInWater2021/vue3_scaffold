<script lang="ts" setup>
import CME2D from "CME2D"

import { TDT_GRAPH } from "@/global"

const emit = defineEmits<{
  loaded: [instance: any]
}>()

const MAP_CONTAINER = "mapWrapperId"

function initCMEMap() {
  const instance = new CME2D({
    target: MAP_CONTAINER,
    view: {
      projection: "EPSG:4326",
      // extent: [70.5, 0.5, 135, 54], // 仅仅中国
      extent: [30, -30.5, 160, 80],
      zoom: 5,
      minZoom: 1,
      center: [104, 25.74],
    },
    baseLayers: [TDT_GRAPH],
  })

  emit("loaded", instance)
}

onMounted(() => initCMEMap())
</script>

<template>
  <div :id="MAP_CONTAINER" class="map-wrapper h-full"></div>
</template>

<style scoped>
.map-wrapper {
  image-rendering: optimize-contrast; /* Chrome, Safari */
  image-rendering: crisp-edges; /* Firefox */
}
</style>
