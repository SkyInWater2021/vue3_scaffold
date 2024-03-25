<script lang="ts" setup>
import { Map, View } from "ol"
import { Tile } from "ol/layer"
import { OSM } from "ol/source"

import { CHENG_DU_LON_LAT } from "@/views/com-layers"

const mapId = "demoMapContainer"

onMounted(() => {
  const mapInstance = new Map({
    target: mapId,
    view: new View({
      projection: "EPSG:4326",
      center: [...CHENG_DU_LON_LAT],
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

  console.log(mapInstance)
  mapInstance.on("loadend", e => {
    console.log("change", e.target === e.map)
  })

  setTimeout(() => {
    // ..
  }, 2000)
})
</script>

<template>
  <div :id="mapId" class="h-full"></div>
</template>
