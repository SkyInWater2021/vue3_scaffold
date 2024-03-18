<script lang="ts" setup>
import { cloneDeep } from "lodash-es"

import { MapEvents } from "@/utils"
import { CHENG_DU_LON_LAT, chengDuPosition } from "@/views/com-layers"

import MapBase from "./MapBase.vue"
import { plotConfig } from "./config"

interface PropType {
  factors: string[]
}
const props = defineProps<PropType>()

const meteoConfig: any = cloneDeep(plotConfig)

const meteoMapRef = ref() // 地面填图组件实例
const isolineRef = ref() // 等值线组件实例
const mapInstance = ref() // 地图实例
const popupInfo = ref() // 浮窗详情信息
const popupRef = ref<HTMLElement>()

const isoLineInstance = ref() // 等值线渲染之后的回调值

const mapLoaded = (instance: any) => {
  mapInstance.value = instance
  mapInstance.value.addLayer(chengDuPosition)

  // 地图点击事件
  mapInstance.value!.on("click", (evt: any) => {
    popupInfo.value = MapEvents.mapPointClick(mapInstance.value as any, evt, {
      popup: popupRef.value!,
    })
    if (popupInfo.value?.overlay) {
      const res = meteoMapRef.value.glbData.find((item: any) => {
        return item.Station_Id_C === popupInfo.value?.pointData.Station_Id_C
      })
      popupInfo.value.pointData = res
      mapInstance.value!.addOverlay(popupInfo.value?.overlay)
    }
  })

  mapInstance.value!.on("pointermove", (evt: any) => {
    MapEvents.mapPointHover(mapInstance.value, evt)
  })
}

function resetMapCenter() {
  const view = mapInstance.value.getView()
  view.setCenter([...CHENG_DU_LON_LAT])
  view.setZoom(6)
}

function closePopup() {
  popupRef.value!.style.display = "none"
}
function clearPopup() {
  const { pointData } = popupInfo.value ?? {}
  if (popupRef.value && !pointData) closePopup()
}
watchEffect(clearPopup)

function updateFactors() {
  meteoMapRef.value.checkList = props.factors
  meteoMapRef.value.changeCheck()
  isoLineInstance.value?.setOpacit(Number(props.factors?.includes("isoBar_Bar")))
}

// TODO 字段排序 字段筛选
// 获取中文映射
function getPopupLegendLabel(str: string) {
  return meteoConfig.legend.find((item: any) => item.value === str)?.label
}

function addIsoline() {
  const config = {
    url: new URL("./getContour.json", import.meta.url).href,
    id: "isolineLayer2",
    Opacity: 1,
    zIndex: 1,
    maxZoom: 22,
    minZoom: 0,
    legend: {
      strokeColor: [
        [-1000, [117, 207, 255, 1]],
        [120, [151, 255, 244, 1]],
        [130, [189, 249, 255, 1]],
        [140, [60, 160, 240, 1]],
        [145, [0, 207, 255, 1]],
        [150, [0, 100, 183, 1]],
        [155, [255, 243, 196, 1]],
        [160, [100, 100, 100, 1]],
        [170, [255, 243, 196, 1]],
        [2000, [255, 220, 0, 1]],
      ],
      peakColor: {
        minNumber: {
          icon: {
            color: "rgb(0,0,255,1)", //icon的颜色
            src: "./pic/L.png", //icon的路径
            scale: 0.08, //icon的缩放
          },
          text: {
            font: "12px 宋体", //字体  字体大小和字体类型都要有，并且中间是空格
            offsetY: 20, //y轴偏移量
            unit: "", //单位
            fill: { color: "#f00" },
          },
        },
      },
    },
  }

  isolineRef.value.AddIsoline(mapInstance.value, config).then((isolineClass: any) => {
    isoLineInstance.value = isolineClass
  })
}

onMounted(() => {
  mapInstance.value.getMap().once("postrender", () => {
    meteoConfig.url = new URL("./aa.json", import.meta.url).href
    meteoConfig.map = mapInstance.value
    meteoMapRef.value.init(mapInstance.value, meteoConfig)

    addIsoline()

    watch(
      () => props.factors.length,
      () => {
        if (!meteoMapRef.value) return
        updateFactors()
      },
    )
  })
})
</script>

<template>
  <div class="gis-map__wrapper h-full">
    <MapBase @loaded="mapLoaded" />
    <CME_IsolineRender ref="isolineRef" />
    <CME_MeteoMap ref="meteoMapRef" />

    <div class="absolute right-1 top-1 rounded bg-[#fffc] p-1">
      <van-icon name="map-marked" size="24" @click="resetMapCenter" />
    </div>

    <div ref="popupRef" class="popup-container">
      <van-icon name="cross" class="popup-close__btn" @click="closePopup" />
      <template v-for="mapKey in Object.keys(popupInfo?.pointData ?? {})" :key="mapKey">
        <div
          v-if="getPopupLegendLabel(mapKey) && popupInfo.pointData[mapKey]"
          class="popup-details__column"
        >
          <div>{{ getPopupLegendLabel(mapKey) }}</div>
          <div style="margin-right: 10px">:</div>
          <div class="text-[#7ad1db]">{{ popupInfo.pointData[mapKey] }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
:deep(.ol-overlay-container) {
  pointer-events: none !important;
}

.gis-map__wrapper {
  position: relative;
  height: 100%;
  cursor: grab;
}

.popup-container {
  position: relative;
  padding: 6px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background-color: var(--global-gray);
  border-radius: 4px;
  cursor: pointer;
}

.popup-container::before {
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -10px;
  border-color: transparent transparent var(--global-gray) transparent;
  border-style: solid;
  border-width: 10px;
  content: "";
}

.popup-close__btn {
  position: absolute;
  top: 4px;
  right: 4px;
}

.popup-details__column {
  display: flex;
}
</style>
