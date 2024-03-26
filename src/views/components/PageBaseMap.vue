<script lang="ts" setup>
import CME2D from "CME2D"
import { Map } from "ol"

import { CHENGDU_LL, WORLD_EXTENT } from "@/global/constants"
import { TDT_GRAPH } from "@/global/layers"

interface PropType {
  mapId: string
  zoom?: number
  extent?: number[]
}

const props = withDefaults(defineProps<PropType>(), {
  zoom: 4,
  extent: () => [...WORLD_EXTENT],
})

const emit = defineEmits<{ loaded: [instance: Map] }>()

function initCMEMap() {
  const instance = new CME2D({
    target: props.mapId,
    view: {
      projection: "EPSG:4326",
      extent: props.extent,
      zoom: props.zoom,
      minZoom: 1,
      center: [...CHENGDU_LL],
    },
    baseLayers: [TDT_GRAPH],
  })

  window.addEventListener("resize", () => instance.updateSize())

  emit("loaded", instance)
}

onMounted(() => initCMEMap())
</script>

<template>
  <div :id="mapId" class="h-full"></div>
</template>
