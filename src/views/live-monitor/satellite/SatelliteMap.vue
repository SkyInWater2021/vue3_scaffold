<script lang="ts" setup>
import { Map } from "ol"

import { chengDuPosition, chinaBoundary, ciaLayer } from "@/views/com-layers"
import { PageBaseMap } from "@/views/components"

import { legend } from "./config"

const currentTickIndex = defineModel<number>({ required: true })

const isFirstRender = ref(true) // 是否是第一次加载
const tifResponse = ref<any[]>([]) // CME_WindyBarb组件解析之后的结果

const RasterRef = ref() // 组件实例
const mapInstance = ref<Map>() // 地图实例
const mapLoaded = (instance: Map) => (mapInstance.value = instance)

const tifArr = [
  "http://111.205.114.94:12301/CMEDATA/SATE/FY4B/2023090200/true_color/FY4B_true_color_20230902060000_4326.tif",
  "/CMEDATA/NAFP/MESO/202309020000/TEM/MESO_202309020000_TEM_202309020600_0_4326.tif",
  "http://111.205.114.94:12301/CMEDATA/SATE/FY4B/2023090200/true_color/FY4B_true_color_20230902060000_4326.tif",
  "/CMEDATA/NAFP/MESO/202309020000/TEM/MESO_202309020000_TEM_202309020600_0_4326.tif",
  "http://111.205.114.94:12301/CMEDATA/SATE/FY4B/2023090200/true_color/FY4B_true_color_20230902060000_4326.tif",
  "/CMEDATA/NAFP/MESO/202309020000/TEM/MESO_202309020000_TEM_202309020600_0_4326.tif",
  "http://111.205.114.94:12301/CMEDATA/SATE/FY4B/2023090200/true_color/FY4B_true_color_20230902060000_4326.tif",
]

// 渲染卫星图层
function renderRaster() {
  if (!mapInstance.value) return

  tifArr.forEach((url, index) => {
    const config = {
      layerName: "cogtifLayer" + index,
      source: {
        normalize: false,
        sources: [{ url: url, nodata: -999 }],
      },
      style: { color: legend, radio: 1, scala: 90 },
      opacity: 1,
      tifType: "single",
    }

    RasterRef.value.AddWindyBarb({ map: mapInstance.value, params: config }).then((res: any) => {
      res.setOpacit(index === currentTickIndex.value ? 1 : 0)

      if (isFirstRender.value) {
        isFirstRender.value = false
        addLayers()
      }

      tifResponse.value[index] = res
    })
  })
}

// 添加其他图层
function addLayers() {
  mapInstance.value?.addLayer(chinaBoundary)
  mapInstance.value?.addLayer(chengDuPosition)
  mapInstance.value?.addLayer(ciaLayer)
}

// 播放卫星图层
watch(currentTickIndex, (newVal, oldVal) => {
  tifResponse.value[newVal]?.setOpacit(1)
  tifResponse.value[oldVal]?.setOpacit(0)
})

onMounted(() => {
  renderRaster()
})
</script>

<template>
  <div class="h-full">
    <PageBaseMap mapId="liveMonitorSatelliteMapId" :zoom="2" @loaded="mapLoaded" />

    <CME_RasterRender ref="RasterRef" />
  </div>
</template>
