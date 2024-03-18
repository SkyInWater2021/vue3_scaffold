<script lang="ts" setup>
import { dateOffset } from "@/utils"

import { hourItems } from "./config"

// 时间筛选
const currentDate = ref("")
const currentDateInfo = ref<string[]>([])

const currentHour = ref(hourItems[0].value)
const showPicker = ref(false)
function changePickerVisible(visible: boolean, isConfirm = false) {
  showPicker.value = visible
  isConfirm
    ? (currentDate.value = currentDateInfo.value.join("-"))
    : (currentDateInfo.value = currentDate.value.split("-"))
}

function changeCurrentInfo() {
  const utcStr = dateOffset({ utc: true, format: "YYYY-MM-DD" })
  currentDate.value = utcStr
  currentDateInfo.value = utcStr.split("-")
}

function changeHour(type: "add" | "sub") {
  const length = hourItems.length
  let index = hourItems.findIndex(item => item.value === currentHour.value)
  index = type === "add" ? (index + 1) % length : (index - 1 + length) % length
  currentHour.value = hourItems[index].value
}

changeCurrentInfo()
</script>

<template>
  <div class="flex flex-wrap items-center">
    <div class="mt-2 w-[40px] text-right">时间:</div>
    <div class="100px mt-2">
      <van-field
        label-width="fit-content"
        v-model="currentDate"
        readonly
        colon
        name="datePicker"
        @click="changePickerVisible(true)"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-date-picker
          v-model="currentDateInfo"
          @confirm="changePickerVisible(false, true)"
          @cancel="changePickerVisible(false)"
          :max-date="new Date()"
        />
      </van-popup>
    </div>

    <div class="mr-2.5 mt-2 w-[80px]">
      <van-dropdown-menu
        style="--van-dropdown-menu-height: 26px; --van-dropdown-menu-title-font-size: 14px"
      >
        <van-dropdown-item v-model="currentHour" :options="hourItems" />
      </van-dropdown-menu>
    </div>

    <div class="mt-2 min-w-[120px] flex-1">
      <van-button size="small" icon="arrow-left" @click="changeHour('sub')" />
      <van-button class="!mx-1" size="small" type="primary">最新</van-button>
      <van-button size="small" icon="arrow" @click="changeHour('add')" />
    </div>
  </div>
</template>

<style scoped>
@import url("./sizer-style.css");
</style>
