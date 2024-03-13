<script lang="ts" setup>
import { chengDuLayer } from "@/views/com-layers"

import MapBase from "./MapBase.vue"
import tempData from "./temp.json"

interface PropType {
  factors: string[]
}
defineProps<PropType>()

const SinglePointRef = ref()

const mapInstance = ref() // 地图实例
const mapLoaded = (instance: any) => {
  mapInstance.value = instance
  addLayers()
}

function addWebGLPoint() {
  const colorFiled = "TEM_ChANGE_24h" //图片颜色渲染字段
  const pngField = "shape" //不同类型对应的不同的图标
  const iconSrc = new URL("@/assets/weather-icons/ufo-shapes.png", import.meta.url).href
  let style = {
    "icon-src": iconSrc, //图片对应的位置
    "icon-color": [
      //图片的颜色
      "interpolate",
      ["linear"],
      ["get", colorFiled], //图片颜色渲染字段 不同的值对应的不同的颜色
      -5,
      [255, 160, 110],
      0,
      [0, 255, 0],
      2,
      [255, 255, 0],
      3,
      [255, 255, 200],
      5,
      [255, 0, 255],
      30,
      [100, 100, 100],
    ],

    "icon-offset": [
      // 不同类型对应的不同的图标
      "match",
      ["get", pngField],
      "light",
      [0, 0], // light类型图标 在"./data/ufo_shapes.png"所在的xy的值
      "sphere",
      [32, 0],
      "circle",
      [32, 0],
      "disc",
      [64, 0],
      "oval",
      [64, 0],
      "triangle",
      [96, 0],
      "fireball",
      [0, 32],
      [0, 32],
    ],
    "icon-size": [32, 32], //图标的大小
    "icon-scale": 0.8, //图标的缩放
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

  SinglePointRef.value.addWebGLCutsomPointLayer(config).then((res: any) => {
    console.log(res, "🍊")
  })
}

// 添加其他图层
function addLayers() {
  mapInstance.value.addLayer(chengDuLayer)
}

onMounted(() => {
  addWebGLPoint()
})
</script>

<template>
  <div class="h-full">
    <MapBase @loaded="mapLoaded" />
    <CME_MeteoSinglePoint ref="SinglePointRef" />
  </div>
</template>
