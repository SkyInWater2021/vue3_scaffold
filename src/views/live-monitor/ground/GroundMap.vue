<script lang="ts" setup>
import { Map } from "ol"

import { ComLayers } from "@/global/layers"
import type { CheckBoxValue } from "@/views/components"
import { PageBaseMap } from "@/views/components"

import MapOverlay from "./MapOverlay.vue"
import { createPointLayer } from "./get-point-layer"
import tempData from "./tempData.json"

const POINT_LAYER_ID = "liveMonitorThunderLayer"

const props = defineProps<{
  showOverlay: boolean
  showTypes: CheckBoxValue[]
}>()

const pointTypes = new Set<string>([])

const mapInstance = ref<Map>()
const mapLoaded = (instance: any) => {
  mapInstance.value = instance
  if (!mapInstance.value) return
  mapInstance.value.addLayer(ComLayers.getCiaLayer())
  mapInstance.value.addLayer(ComLayers.getChengDuLayer())
  mapInstance.value.addLayer(ComLayers.getSichuanBoundaryLayer())

  const layer = createPointLayer(tempData, pointTypes, POINT_LAYER_ID)
  mapInstance.value.addLayer(layer)
}

function getLayerById(layerId: string) {
  if (!mapInstance.value) return
  var layers = mapInstance.value.getLayers().getArray()
  for (let i = 0; i < layers.length; i++) {
    if (layers[i].get("id") === layerId) return layers[i]
  }
  return null // 如果未找到匹配图层则返回null
}

onMounted(() => {
  watch(
    () => props.showTypes.length,
    () => {
      pointTypes.clear()
      props.showTypes.forEach(item => pointTypes.add(String(item)))
      pointTypes.add("pointNumber")
      const layer = getLayerById(POINT_LAYER_ID)
      layer?.changed()
    },
    { immediate: true },
  )
})
</script>

<template>
  <div>
    <PageBaseMap mapId="liveMonitorGroundMapId" @loaded="mapLoaded" />
    <MapOverlay v-if="mapInstance" v-show="showOverlay" :mapInstance="mapInstance" />
  </div>
</template>
@/global/com-layers
