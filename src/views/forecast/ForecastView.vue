<script lang="ts" setup>
import { Map, View, Feature, Collection } from "ol"
import { add } from "ol/coordinate"
import { LinearRing, Polygon } from "ol/geom"
import TileLayer from "ol/layer/Tile"
import VectorLayer from "ol/layer/Vector"
import OSM from "ol/source/OSM"
import VectorSource from "ol/source/Vector"
import { Style, Fill, Stroke } from "ol/style"

import { CHENGDU_LL, WORLD_EXTENT } from "@/global/constants"

import tempJson from "./tempData.json"

// source
// feature
// geom: point | circle | polygon | linearRing | lineString | MultiPoint | MultiPolygon | MultiLineString
// style

const mapId = "demoMapContainer"
const mapInstance = ref<Map>()

let demoSource: any
function createPointLayer() {
  const vectorSource = new VectorSource({
    url: new URL("./tempData.json", import.meta.url).href,
    loader: function () {
      const vectorSource = this as VectorSource
      const features = new Collection<Feature<Polygon>>([], { unique: true })
      const fetchUrl = vectorSource.getUrl()
      console.log("请求地址🍊:", fetchUrl)
      setTimeout(() => {
        tempJson.forEach(item => {
          const coordinate = [parseFloat(item.Lon), parseFloat(item.Lat)]
          const radius = 0.1 // 计算五角星的顶点坐标
          const angle = Math.PI / 5
          const starPoints: any = []
          for (let i = 0; i < 10; i++) {
            const r = i % 2 === 0 ? radius : radius / 2
            starPoints.push(
              add([...coordinate], [r * Math.cos(i * angle), r * Math.sin(i * angle)]),
            )
          }
          starPoints.push(starPoints[0])

          const starStyle = new Style({
            fill: new Fill({ color: "yellow" }),
            stroke: new Stroke({ color: "red", width: 2 }),
          })

          // 获取 LinearRing 的面积
          const linearRing = new LinearRing(starPoints)
          const area = linearRing.getArea()
          console.log("Area:", area)

          const feature = new Feature({
            geometry: new Polygon([starPoints]),
          })
          feature.setStyle(starStyle)

          features.push(feature)
        })

        vectorSource.addFeatures(features.getArray())
      }, 1000)
    },
  })

  demoSource = vectorSource

  return new VectorLayer({
    zIndex: 9,
    source: vectorSource,
  })
}

onMounted(() => {
  mapInstance.value = new Map({
    target: mapId,
    view: new View({
      projection: "EPSG:4326",
      center: [...CHENGDU_LL],
      zoom: 5,
      minZoom: 3,
      maxZoom: 15,
      enableRotation: false,
      extent: [...WORLD_EXTENT],
      multiWorld: false,
    }),
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    controls: [],
  })

  const pointLayer = createPointLayer()
  mapInstance.value.addLayer(pointLayer)
})

function handleBtnClick() {
  demoSource?.refresh()
}
</script>

<template>
  <div class="flex h-full flex-col">
    <van-button class="h-10" @click="handleBtnClick">hello world</van-button>
    <div :id="mapId" class="flex-1"></div>
  </div>
</template>
