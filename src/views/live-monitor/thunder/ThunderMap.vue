<script lang="ts" setup>
import { ComLayers } from "@/global/layers"
import { PageBaseMap } from "@/views/components"

import { createThunderLayer } from "./create-thunder-layer"
import tempData from "./tempData.json"

const mapInstance = ref() // 地图实例
const mapLoaded = (instance: any) => {
  mapInstance.value = instance
  mapInstance.value.addLayer(ComLayers.getCiaLayer())
  mapInstance.value.addLayer(ComLayers.getChengDuLayer())
  mapInstance.value.addLayer(ComLayers.getSichuanBoundaryLayer())

  const thunderLayer = createThunderLayer(tempData)
  mapInstance.value.addLayer(thunderLayer)
}
</script>

<template>
  <div class="relative">
    <PageBaseMap map-id="liveMonitorThunderMapId" @loaded="mapLoaded" />

    <div
      class="absolute bottom-1 left-0 right-0 mx-auto flex w-2/3 justify-center bg-[#0004] p-2.5 text-white"
    >
      <img width="20" src="@/assets/map-icons/thunder+.svg" alt="" />
      <span>正电</span>

      <img class="ml-5" width="20" src="@/assets/map-icons/thunder-.svg" alt="" />
      <span>负电</span>
    </div>
  </div>
</template>
@/global/com-layers
