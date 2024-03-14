<script lang="ts" setup>
import { cloneDeep } from "lodash-es"

import { MapEvents } from "@/utils"
import { chengDuLayer } from "@/views/com-layers"

import MapBase from "./MapBase.vue"
import { plotConfig } from "./config"

interface PropType {
  factors: string[]
}
const props = defineProps<PropType>()

const meteoConfig: any = cloneDeep(plotConfig)

const meteoMapRef = ref() // 地面填图组件实例
const mapInstance = ref() // 地图实例

const popupInfo = ref() // 浮窗详情信息
const popupRef = ref<HTMLElement>()

const popupDetails = computed(() => {
  const keys = Object.keys(popupInfo.value?.pointData ?? {})
  // TODO 给字段排序
  // ...
  return keys
})

const mapLoaded = (instance: any) => {
  mapInstance.value = instance
  mapInstance.value.addLayer(chengDuLayer)

  mapInstance.value!.on("click", (evt: any) => {
    popupInfo.value = MapEvents.mapPointClick(mapInstance.value as any, evt, {
      popup: popupRef.value!,
    })
    if (popupInfo.value?.overlay) {
      mapInstance.value!.addOverlay(popupInfo.value?.overlay)
    }
  })

  mapInstance.value!.on("pointermove", (evt: any) => {
    MapEvents.mapPointHover(mapInstance.value, evt)
  })
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
}

onMounted(() => {
  mapInstance.value.getMap().once("postrender", () => {
    meteoConfig.url = new URL("./aa.json", import.meta.url).href
    meteoConfig.map = mapInstance.value
    meteoMapRef.value.init(mapInstance.value, meteoConfig)

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
    <CME_MeteoMap ref="meteoMapRef" />

    <div ref="popupRef" class="popup-container">
      <van-icon name="cross" class="popup-close__btn" @click="closePopup" />
      <template v-for="mapKey in popupDetails" :key="mapKey">
        <div v-if="mapKey && popupInfo.pointData[mapKey]" class="popup-details__column">
          <div>{{ mapKey }}</div>
          <div style="margin-right: 10px">:</div>
          <div>{{ popupInfo.pointData[mapKey] }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.gis-map__wrapper {
  position: relative;
  height: 100%;
  cursor: grab;
}

.popup-container {
  position: relative;
  padding: 20px;
  font-size: 14px;
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
  margin-bottom: 8px;
}
</style>
