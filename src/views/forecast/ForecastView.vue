<script lang="ts" setup>
import { Map, View } from "ol"
import { Tile } from "ol/layer"
import { OSM } from "ol/source"

import { CHENGDU_LL } from "@/global/constants"
import { ComLayers } from "@/global/layers"

const chengduLayer = ComLayers.getChengDuLayer()

const mapId = "demoMapContainer"
const mapInstance = ref<Map>()
onMounted(() => {
  mapInstance.value = new Map({
    target: mapId,
    view: new View({
      projection: "EPSG:4326",
      center: [...CHENGDU_LL],
      zoom: 5,
    }),
    layers: [
      new Tile({
        source: new OSM(),
      }),
    ],
    controls: [],
    // interactions: [],
    // maxTilesLoading: 默认值 16
    // moveTolerance: 默认值 1
    // overlays: [],
  })

  mapInstance.value.addLayer(ComLayers.getCiaLayer())
  mapInstance.value.addLayer(chengduLayer)
  console.log(chengduLayer)
  console.log(mapInstance.value.getAllLayers(), "111111")

  setTimeout(() => {
    // ..
  }, 2000)
})

function handleBtnClick() {}
</script>

<template>
  <div class="flex h-full flex-col">
    <van-button class="h-10" @click="handleBtnClick">hello world</van-button>
    <div :id="mapId" class="flex-1"></div>
  </div>
</template>
@/global/com-layers
