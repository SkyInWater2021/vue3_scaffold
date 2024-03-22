<script lang="ts" setup>
import GroundView from "../ground/GroundView.vue"

import { heightItems } from "./config"

const currentHeight = ref<string>(String(heightItems[0].value))

const showHeightPicker = ref(false)
function handleConfirm({ selectedOptions }: any) {
  currentHeight.value = selectedOptions[0].value
  changeHeightPicker(false)
}
function changeHeightPicker(visible: boolean) {
  showHeightPicker.value = visible
}
function changeHeight(type: "add" | "sub") {
  const length = heightItems.length
  let index = heightItems.findIndex((item: any) => String(item.value) === currentHeight.value)
  index = type === "add" ? (index + 1) % length : (index - 1 + length) % length
  currentHeight.value = String(heightItems[index].value)
}
</script>

<template>
  <GroundView title="高空">
    <template #sizer>
      <div class="flex items-center">
        <div class="mr-1 w-[40px] text-right">高度:</div>
        <div class="flex flex-1 items-center">
          <van-button
            size="small"
            icon="arrow-up"
            style="height: 26px"
            @click="changeHeight('sub')"
          />
          <div class="mx-1 w-[80px]">
            <van-field
              v-model="currentHeight"
              readonly
              colon
              type="number"
              name="borderPicker"
              @click="changeHeightPicker(true)"
            />
            <van-popup v-model:show="showHeightPicker" position="bottom">
              <van-picker
                :columns="heightItems"
                @confirm="handleConfirm"
                @cancel="changeHeightPicker(false)"
              />
            </van-popup>
          </div>
          <van-button
            size="small"
            icon="arrow-down"
            style="height: 26px"
            @click="changeHeight('add')"
          />
        </div>
      </div>
    </template>
  </GroundView>
</template>
