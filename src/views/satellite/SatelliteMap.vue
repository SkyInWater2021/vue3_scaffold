<script lang="ts" setup>
import { TDT_CIA } from "@/global"
import ChinaJson from "@/global/json/100000_full.json"
import { CreateLayer } from "@/utils"
import { BaseMap } from "@/views/components"

import { legend } from "./config"

interface PropType {
  currentTickIndex?: number
}
const props = withDefaults(defineProps<PropType>(), { currentTickIndex: 0 })

const isFirstRender = ref(true) // 是否是第一次加载
const rasterRes = ref<any[]>([]) // CME_RasterRender组件解析之后的结果

const rasterRenderRef = ref() // 组件实例
const mapInstance = ref() // 地图实例
const mapLoaded = (instance: any) => (mapInstance.value = instance)

const tifArr = [
  "http://111.205.114.94:12301/CMEDATA/SATE/FY4B/2023090200/true_color/FY4B_true_color_20230902060000_4326.tif",
  "/CMEDATA/NAFP/MESO/202309020000/TEM/MESO_202309020000_TEM_202309020600_0_4326.tif",
  "http://111.205.114.94:12301/CMEDATA/SATE/FY4B/2023090200/true_color/FY4B_true_color_20230902060000_4326.tif",
  "/CMEDATA/NAFP/MESO/202309020000/TEM/MESO_202309020000_TEM_202309020600_0_4326.tif",
  "http://111.205.114.94:12301/CMEDATA/SATE/FY4B/2023090200/true_color/FY4B_true_color_20230902060000_4326.tif",
  "/CMEDATA/NAFP/MESO/202309020000/TEM/MESO_202309020000_TEM_202309020600_0_4326.tif",
  "http://111.205.114.94:12301/CMEDATA/SATE/FY4B/2023090200/true_color/FY4B_true_color_20230902060000_4326.tif",
]

const currentTifIndex = computed(() => props.currentTickIndex ?? 0)

function renderRaster() {
  if (!mapInstance.value) return

  tifArr.forEach((url, index) => {
    const config = {
      layerName: "satellite_layer_tif" + index,
      tifType: "single",
      style: { color: legend, radio: 1, scala: 100 },
      opacity: 1,
      source: {
        normalize: false,
        sources: [{ url: url, nodata: -999, min: -100, max: 100 }],
      },
    }

    rasterRenderRef.value
      .AddWindyBarb({ map: mapInstance.value, params: config })
      .then((res: any) => {
        res.setVisible(index === currentTifIndex.value)

        if (isFirstRender.value) {
          isFirstRender.value = false

          const view = mapInstance.value.getView()
          view.setMinZoom(1)
          view.setCenter([104, 25.74])
          addLayers()
        }

        rasterRes.value[index] = res
      })
  })
}

function addLayers() {
  // 添加图层
  const chinaBoundary = CreateLayer.createLayerOfGeoJson(ChinaJson, "chinaBoundaryLayer")
  const chengDuLayer = CreateLayer.createIconLayer(
    [{ Lon: " 104.06543521970411", Lat: " 30.577049300041224", label: "成都" }],
    "chengduPositionLayer",
  )
  const ciaLayer = CreateLayer.createXYZLayer(TDT_CIA)

  mapInstance.value.addLayer(chinaBoundary)
  mapInstance.value.addLayer(chengDuLayer)
  mapInstance.value.addLayer(ciaLayer)
}

watch(currentTifIndex, (newVal, oldVal) => {
  rasterRes.value[newVal]?.setVisible(true)
  rasterRes.value[oldVal]?.setVisible(false)
})

onMounted(() => {
  renderRaster()
})
</script>

<template>
  <div class="h-full">
    <BaseMap @loaded="mapLoaded" />
    <CME_RasterRender ref="rasterRenderRef" />
  </div>
</template>
