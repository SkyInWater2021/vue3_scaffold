<script lang="ts" setup>
import { CHENGDU_LL } from "@/global/constants"
import { CreateLayer } from "@/utils/open-layer"
import { PageBaseMap } from "@/views/components"

const mapInstance = ref()
const mapLoaded = (instance: any) => {
  mapInstance.value = instance
  const layer = CreateLayer.createPulseIconLayer(
    [{ Lon: CHENGDU_LL[0], Lat: CHENGDU_LL[1] }],
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
