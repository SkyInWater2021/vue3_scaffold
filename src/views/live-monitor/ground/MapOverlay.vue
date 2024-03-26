<script lang="ts" setup>
import { ComLayers } from "@/global/layers"

const props = defineProps<{
  mapInstance: any
}>()

const showPosition = ref(false) // 是否选中定位
const showBoundary = ref(false) // 是否选中县级

let positionLayer = ComLayers.getLivePositionLayer()
const sichuanCountryBoundary = ComLayers.getSichuanCountryBoundaryLayer()

function createLayer() {
  positionLayer.setVisible(showPosition.value)
  positionLayer.setZIndex(11)
  sichuanCountryBoundary.setVisible(showBoundary.value)
  sichuanCountryBoundary.setZIndex(1)

  props.mapInstance.addLayer(sichuanCountryBoundary)
  props.mapInstance.addLayer(positionLayer)
}
createLayer()

function handlePositionClick() {
  showPosition.value = !showPosition.value
  positionLayer.setVisible(showPosition.value)
}

function handleBoundaryClick() {
  showBoundary.value = !showBoundary.value
  sichuanCountryBoundary.setVisible(showBoundary.value)
}
</script>

<template>
  <div>
    <div class="absolute left-1 top-1">
      <div class="overlay-box" :class="{ 'is-active': showPosition }" @click="handlePositionClick">
        <van-icon name="guide-o" size="20" />
        <span>定位</span>
      </div>

      <div
        class="overlay-box mt-2"
        :class="{ 'is-active': showBoundary }"
        @click="handleBoundaryClick"
      >
        <van-icon name="coupon-o" size="20" />
        <span>县界</span>
      </div>
    </div>

    <div class="absolute right-1 top-1">
      <div class="overlay-box">
        <van-icon name="list-switch" size="20" />
        <span>排序</span>
      </div>

      <div class="overlay-box mt-2">
        <van-icon name="aim" size="20" />
        <span>单站查询</span>
      </div>

      <div class="overlay-box mt-2">
        <van-icon name="apps-o" size="20" />
        <span>区域查询</span>
      </div>

      <div class="overlay-box mt-2">
        <van-icon name="aim" size="20" />
        <span>雷达</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35px;
  overflow: hidden;
  color: var(--van-blue);
  background-color: #fffc;
  border: 1px solid var(--van-blue);
  aspect-ratio: 1;
}

.overlay-box span {
  font-size: 8px;
  line-height: 10px;
}

.overlay-box.is-active {
  border: 2px solid red;
}
</style>
@/global/com-layers
