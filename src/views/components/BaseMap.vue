<script lang="ts" setup>
import CME2D from "CME2D"

import { CHINA_ONLINE_COMMUNITY } from "@/global"

const emit = defineEmits<{
  loaded: [instance: any]
}>()

function initCMEMap() {
  const instance = new CME2D({
    target: "mapWrapperId",
    view: {
      projection: "EPSG:4326",
    },
    baseLayers: [CHINA_ONLINE_COMMUNITY],
  })

  emit("loaded", instance)
}

onMounted(() => initCMEMap())
</script>

<template>
  <div id="mapWrapperId" class="h-full"></div>
</template>
