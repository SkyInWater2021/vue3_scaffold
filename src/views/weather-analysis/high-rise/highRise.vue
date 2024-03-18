<script lang="ts" setup>
import GroundView from "../ground/GroundView.vue"

import { heightItems } from "./config"

const title = "高空"

const currentHeight = ref(heightItems[0].value)
function changeHour(type: "add" | "sub") {
  const length = heightItems.length
  let index = heightItems.findIndex((item: any) => item.value === currentHeight.value)
  index = type === "add" ? (index + 1) % length : (index - 1 + length) % length
  currentHeight.value = heightItems[index].value
}
</script>

<template>
  <GroundView :title="title">
    <template #sizer>
      <div class="mt-2 flex items-center pb-2">
        <div class="mr-2.5 w-[40px] text-right">高度:</div>
        <div class="flex flex-1 items-center">
          <van-button size="small" icon="arrow-up" @click="changeHour('sub')" />
          <div class="mx-1 w-[80px]">
            <van-dropdown-menu
              style="--van-dropdown-menu-height: 26px; --van-dropdown-menu-title-font-size: 14px"
            >
              <van-dropdown-item v-model="currentHeight" :options="heightItems" />
            </van-dropdown-menu>
          </div>
          <van-button size="small" icon="arrow-down" @click="changeHour('add')" />
        </div>
      </div>
    </template>
  </GroundView>
</template>

<style scoped>
@import url("../ground//sizer-style.css");

/* 弹出层 */
:deep(.van-popup--top) {
  top: 2px;
  left: 87px;
  width: 80px;
}
</style>
