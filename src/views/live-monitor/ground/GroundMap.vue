<script lang="ts" setup>
import { useHomeStore } from "@/store/home"
import { CreateLayer } from "@/utils"
import { chengDuPosition, ciaLayer, sichuanBoundary } from "@/views/com-layers"
import { PageBaseMap } from "@/views/components"

import tempData from "./tempData.json"

const store = useHomeStore()

const singlePointRef = ref()
const mapInstance = ref() // 地图实例
const mapLoaded = (instance: any) => {
  mapInstance.value = instance
  mapInstance.value.addLayer(ciaLayer)
  mapInstance.value.addLayer(chengDuPosition)
  mapInstance.value.addLayer(sichuanBoundary)
  const currentLivePosition = CreateLayer.createPulseIconLayer(
    [{ Lon: store.currentLivePosition[0], Lat: store.currentLivePosition[1], label: "当前位置" }],
    "currentLivePosition",
  )
  mapInstance.value.addLayer(currentLivePosition)
}

function addWebGLPoint() {
  const colorFiled = "PRE_6h" //图片颜色渲染字段
  const pngField = "shape" //不同类型对应的不同的图标
  let style = {
    "icon-src": "/pic/ufo_shapes.png", //图片对应的位置
    "icon-color": [
      "interpolate",
      ["linear"],
      ["get", colorFiled],
      5,
      [0, 0, 255],
      10,
      [250, 255, 100],
      20,
      [255, 160, 110],
      25,
      [0, 255, 0],
      30,
      [255, 255, 0],
      35,
      [255, 255, 200],
      40,
      [255, 0, 255],
      70,
      [100, 100, 100],
    ],
    "icon-offset": ["match", ["get", pngField], "shape", [0, 32], [32, 0]],
    "icon-size": [32, 32],
    "icon-scale": 0.4,
  }
  let config = {
    map: mapInstance.value,
    config: {
      style: style,
      features: tempData,
      lon: "Lon",
      lat: "Lat",
      pngField: "shape",
      filedName: colorFiled,
    },
  }
  singlePointRef.value.addWebGLCutsomPointLayer(config)
}

onMounted(() => {
  addWebGLPoint()
})
</script>

<template>
  <div>
    <PageBaseMap mapId="liveMonitorGroundMapId" @loaded="mapLoaded" />
    <CME_MeteoSinglePoint ref="singlePointRef" />
  </div>
</template>
