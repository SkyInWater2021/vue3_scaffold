<script lang="ts" setup>
import CME2D from "CME2D"

const map = ref()
function initCMEMap() {
  map.value = new CME2D({
    target: "mapWrapperId",
    view: {
      center: [102.945031, 30.181722],
      projection: "EPSG:4326",
      zoom: 7,
    },
    baseLayers: [
      {
        layerName: "geoqName",
        isDefault: true,
        layerType: "TileXYZ",
        layerUrl:
          "http://t2.tianditu.com/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=fb258b4c0bbf60ff7a0205b519ad9a96",
      },
      {
        layerName: "geoqName",
        isDefault: true,
        layerType: "TileXYZ",
        layerUrl:
          "http://t2.tianditu.com/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=fb258b4c0bbf60ff7a0205b519ad9a96",
      },
    ],
  })
}

onMounted(() => {
  initCMEMap()
})
</script>

<template>
  <div id="mapWrapperId" class="h-full"></div>
  <Demo />
</template>
