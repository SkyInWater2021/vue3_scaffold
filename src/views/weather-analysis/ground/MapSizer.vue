<script lang="ts" setup>
import { dateOffset } from "@/utils/format-date"
import { SizerDatePicker } from "@/views/components"

import { hourItems } from "./config"

// ----- 时间筛选 -----
const formatted = "YYYY-MM-DD"
const currentDate = ref(dateOffset({ format: formatted }))

// ----- 日期筛选 -----
const currentHour = ref(hourItems[0].value)
const showHourPicker = ref(false)
function handleConfirm({ selectedOptions }: any) {
  currentHour.value = selectedOptions[0].value
  changeHourPicker(false)
}
function changeHourPicker(visible: boolean) {
  showHourPicker.value = visible
}
function changeHour(type: "add" | "sub") {
  const length = hourItems.length
  let index = hourItems.findIndex(item => item.value === currentHour.value)
  index = type === "add" ? (index + 1) % length : (index - 1 + length) % length
  currentHour.value = hourItems[index].value
}

// 最新时次点击
function handleLatestClick() {
  // TODO 修改为最新日期
  currentHour.value = hourItems[0].value
}
</script>

<template>
  <div class="flex flex-wrap items-center">
    <div class="mr-1 w-[40px] text-right">时间:</div>
    <div class="mr-1 w-[120px]">
      <SizerDatePicker v-model="currentDate" :formatted="formatted" :show-arrow="false" />
    </div>

    <div class="mr-2.5 w-[60px]">
      <van-field
        v-model="currentHour"
        readonly
        colon
        name="borderPicker"
        @click="changeHourPicker(true)"
      />
      <van-popup v-model:show="showHourPicker" position="bottom">
        <van-picker
          :columns="hourItems"
          @confirm="handleConfirm"
          @cancel="changeHourPicker(false)"
        />
      </van-popup>
    </div>

    <div class="min-w-[120px] flex-1">
      <van-button size="small" icon="arrow-left" style="height: 26px" @click="changeHour('sub')" />
      <van-button
        class="!mx-1"
        size="small"
        style="height: 26px"
        type="primary"
        @click="handleLatestClick"
      >
        最新
      </van-button>
      <van-button size="small" icon="arrow" style="height: 26px" @click="changeHour('add')" />
    </div>
  </div>
</template>
