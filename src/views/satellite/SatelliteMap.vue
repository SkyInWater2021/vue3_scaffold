<script lang="ts" setup>
import { BaseMap } from "@/views/components"
const rasterRenderRef = ref()
const mapInstance = ref()
const mapLoaded = (instance: any) => (mapInstance.value = instance)

const tifUrl =
  "http://111.205.114.94:12301/CMEDATA/SATE/FY4B/2023090200/true_color/FY4B_true_color_20230902060000_4326.tif"

const legend = [
  [0.01, [255, 255, 255, 0]],
  [5.0, [161, 212, 255, 0.8]],
  [10.0, [0, 236, 0, 0.8]],
  [15.0, [0, 0, 255, 0.8]],
  [20.0, [0, 200, 0, 0.8]],
  [25.0, [0, 141, 0, 0.8]],
  [30.0, [255, 255, 0, 0.8]],
  [35.0, [231, 192, 0, 0.8]],
  [40.0, [252, 144, 0, 0.8]],
  [45.0, [255, 0, 0, 0.8]],
  [50.0, [214, 0, 0, 0.8]],
  [55.0, [192, 0, 0, 0.8]],
  [60.0, [255, 0, 240, 0.8]],
  [65.0, [120, 0, 132, 0.8]],
  [70.0, [173, 144, 240, 0.8]],
]

const config = {
  layerName: "satellite_layer_tif",
  tifType: "single",
  style: { color: legend, radio: 1, scala: 5 },
  opacity: 0.1,
  source: { normalize: false, sources: [{ url: tifUrl, nodata: -999, min: -100000, max: 100000 }] },
}

function addNatureData() {
  if (!mapInstance.value) return

  rasterRenderRef.value
    .AddWindyBarb({ map: mapInstance.value, params: config })
    .then((res: any) => {
      console.log(res)
      const view = mapInstance.value.getView()
      view.setMinZoom(4)
      view.setCenter([100.31, 25.74])
    })
}

onMounted(() => {
  addNatureData()
})
</script>

<template>
  <div class="h-full">
    <BaseMap @loaded="mapLoaded" />
    <CME_RasterRender ref="rasterRenderRef" />
  </div>
</template>
