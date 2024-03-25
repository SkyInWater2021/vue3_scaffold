<script lang="ts" setup>
import { CreateLayer } from "@/utils"
import { CHENG_DU_LON_LAT } from "@/views/com-layers"
import { PageBaseMap } from "@/views/components"

const mapInstance = ref()
const mapLoaded = (instance: any) => {
  mapInstance.value = instance
  const layer = CreateLayer.createPulseIconLayer(
    [{ Lon: CHENG_DU_LON_LAT[0], Lat: CHENG_DU_LON_LAT[1] }],
    "DEMO_PLUSE_POINT",
  )
  mapInstance.value.addLayer(layer)
}
</script>

<template>
  <div class="flex h-full flex-col">
    <PageBaseMap map-id="weatherAnalysisECThinMapId" @loaded="mapLoaded" />
  </div>
</template>
