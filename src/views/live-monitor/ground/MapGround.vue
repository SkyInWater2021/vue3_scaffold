<script lang="ts" setup>
import { chengDuPosition, ciaLayer, sichuanBoundary } from "@/views/com-layers"

import BaseMap from "./MapBase.vue"
import tempData from "./tempData.json"

const singlePointRef = ref()
const mapInstance = ref() // 地图实例
const mapLoaded = (instance: any) => {
  mapInstance.value = instance
  mapInstance.value.addLayer(ciaLayer)
  mapInstance.value.addLayer(chengDuPosition)
  mapInstance.value.addLayer(sichuanBoundary)
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
    "icon-size": [32, 32], //图标的大小
    "icon-scale": 0.4, //图标的缩放
  }
  let config = {
    map: mapInstance.value,
    config: {
      style: style, //样式
      features: tempData, //数据
      lon: "Lon", //经度对应的字段
      lat: "Lat", // 纬度对应的字段
      pngField: "shape", //图片对应的字段
      filedName: colorFiled, //渲染的字段  颜色对应的字段 颜色根据该字段值渲染不同的颜色
    },
  }

  console.log(singlePointRef.value)
  singlePointRef.value.addWebGLCutsomPointLayer(config)
}

onMounted(() => {
  addWebGLPoint()
})
</script>

<template>
  <div class="h-full">
    <BaseMap @loaded="mapLoaded" />
    <CME_MeteoSinglePoint ref="singlePointRef" />
  </div>
</template>
