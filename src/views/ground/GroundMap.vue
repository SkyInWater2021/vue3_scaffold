<script lang="ts" setup>
import { chengDuLayer } from "@/views/com-layers"

import MapBase from "./MapBase.vue"

interface PropType {
  factors: string[]
}
defineProps<PropType>()

const mapInstance = ref() // 地图实例
const mapLoaded = (instance: any) => {
  mapInstance.value = instance
  addLayers()
}

// 添加其他图层
function addLayers() {
  mapInstance.value.addLayer(chengDuLayer)
}
</script>

<template>
  <div class="h-full">
    <MapBase @loaded="mapLoaded" />
  </div>
</template>
