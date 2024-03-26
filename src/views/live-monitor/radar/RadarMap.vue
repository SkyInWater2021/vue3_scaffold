<script lang="ts" setup>
import { Map } from "ol"

import { CHENGDU_LL } from "@/global/constants"
import { ComLayers } from "@/global/layers"
import { PageBaseMap } from "@/views/components"

const initZoom = 5

const gridRenderRef = ref()
const gridRenderInstance = ref()

const mapInstance = ref<Map>() // 地图实例
const mapLoaded = (instance: Map) => {
  mapInstance.value = instance
  addLayers()
}

function addLayers() {
  mapInstance.value?.addLayer(ComLayers.getCiaLayer())
  mapInstance.value?.addLayer(ComLayers.getChengDuLayer())
  mapInstance.value?.addLayer(ComLayers.getSichuanBoundaryLayer())
  addSpot()
}

function resetMapCenter() {
  if (!mapInstance.value) return
  const view = mapInstance.value.getView()
  view.setCenter([...CHENGDU_LL])
  view.setZoom(initZoom)
}

function addSpot() {
  let data = {
    name: "雷达",
    title: "雷达",
    id: "NAFP-TEM",
    type: "grid",
    url: "http://111.205.114.94:12301/CMEDATA/SATE/FY4B/2023090200/true_color/FY4B_true_color_20230902060000_4326.tif",
    Opacity: 0.8,
    showHide: true,
    radio: 1, // 显示类型 1为 色斑图，2为渐变图
    zIndex: 1,
    oldUrl: "",
    legend: [
      [0.01, [255, 255, 255, 0]],
      [5.0, [161, 212, 255]],
      [10.0, [0, 236, 0]],
      [15.0, [0, 0, 255]],
      [20.0, [0, 200, 0]],
      [25.0, [0, 141, 0]],
      [30.0, [255, 255, 0]],
      [35.0, [231, 192, 0]],
      [40.0, [252, 144, 0]],
      [45.0, [255, 0, 0]],
      [50.0, [214, 0, 0]],
      [55.0, [192, 0, 0]],
      [60.0, [255, 0, 240]],
      [65.0, [120, 0, 132]],
      [70.0, [173, 144, 240]],
    ],
    scala: 5, // 数据倍数
    min: -70,
    max: 100,
  }

  gridRenderRef.value.AddWindyBarb(mapInstance.value, data).then((res: any) => {
    gridRenderInstance.value = res
  })
}
</script>

<template>
  <div class="relative h-full">
    <PageBaseMap map-id="liveMonitorRadarMapId" :zoom="initZoom" @loaded="mapLoaded" />
    <CME_GridRender ref="gridRenderRef" />

    <div class="absolute right-2.5 top-[60px] rounded bg-[#fffc] p-1">
      <van-icon name="map-marked" size="24" @click="resetMapCenter" />
    </div>
  </div>
</template>
