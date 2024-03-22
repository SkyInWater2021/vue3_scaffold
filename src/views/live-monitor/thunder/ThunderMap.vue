<script lang="ts" setup>
import { chengDuPosition, ciaLayer, sichuanBoundary } from "@/views/com-layers"
import { PageBaseMap } from "@/views/components"

const mapInstance = ref() // 地图实例
const mapLoaded = (instance: any) => {
  mapInstance.value = instance
  mapInstance.value.addLayer(ciaLayer)
  mapInstance.value.addLayer(chengDuPosition)
  mapInstance.value.addLayer(sichuanBoundary)
}
</script>

<template>
  <div>
    <PageBaseMap map-id="liveMonitorThunderMapId" @loaded="mapLoaded" />
  </div>
</template>
