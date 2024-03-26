<script lang="ts" setup>
import { Map, View } from "ol"

import { CHENGDU_LL, WORLD_EXTENT } from "@/global/constants"
import { ComLayers } from "@/global/layers"

const mapId = "demoMapContainer"
const mapInstance = ref<Map>()
onMounted(() => {
  mapInstance.value = new Map({
    target: mapId,
    view: new View({
      projection: "EPSG:4326",
      center: [...CHENGDU_LL],
      zoom: 5,
      minZoom: 3,
      enableRotation: false,
      extent: [...WORLD_EXTENT],
      multiWorld: false,
      // constrainOnlyCenter: true,
    }),
    layers: [ComLayers.getTerrainLayer()],
    controls: [],
    // interactions: [],
    // maxTilesLoading: 默认值 16
    // moveTolerance: 默认值 1
    // overlays: [],
  })

  mapInstance.value.addLayer(ComLayers.getCiaLayer())
  mapInstance.value.addLayer(ComLayers.getLivePositionLayer())

  setTimeout(() => {
    // ..
  }, 3000)
})

function handleBtnClick() {
  const view = mapInstance.value?.getView()
  console.log(view?.getResolution())
}
</script>

<template>
  <div class="flex h-full flex-col">
    <van-button class="h-10" @click="handleBtnClick">hello world</van-button>
    <div :id="mapId" class="flex-1"></div>
  </div>
</template>
