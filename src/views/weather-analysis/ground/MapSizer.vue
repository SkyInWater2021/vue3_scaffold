<script lang="ts" setup>
import { dateOffset } from "@/utils"

import { hourItems } from "./config"

// ----- 时间筛选 -----
const currentDate = ref("")
const currentDateInfo = ref<string[]>([])
const showDatePicker = ref(false)
function changeDatePicker(visible: boolean, isConfirm = false) {
  showDatePicker.value = visible
  isConfirm
    ? (currentDate.value = currentDateInfo.value.join("-"))
    : (currentDateInfo.value = currentDate.value.split("-"))
}
function changeCurrentInfo() {
  const utcStr = dateOffset({ utc: true, format: "YYYY-MM-DD" })
  currentDate.value = utcStr
  currentDateInfo.value = utcStr.split("-")
}
changeCurrentInfo()

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
    <div class="my-2 mr-1 w-[40px] text-right">时间:</div>
    <div class="my-2 mr-1 w-[100px]">
      <van-field
        label-width="fit-content"
        v-model="currentDate"
        readonly
        colon
        name="datePicker"
        @click="changeDatePicker(true)"
      />
      <van-popup v-model:show="showDatePicker" position="bottom">
        <van-date-picker
          v-model="currentDateInfo"
          :max-date="new Date()"
          @confirm="changeDatePicker(false, true)"
          @cancel="changeDatePicker(false)"
        />
      </van-popup>
    </div>

    <div class="my-2 mr-2.5 w-[60px]">
      <van-field
        v-model="currentHour"
        readonly
        colon
        name="datePicker"
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

    <div class="my-2 min-w-[120px] flex-1">
      <van-button size="small" icon="arrow-left" @click="changeHour('sub')" />
      <van-button class="!mx-1" size="small" type="primary" @click="handleLatestClick">
        最新
      </van-button>
      <van-button size="small" icon="arrow" @click="changeHour('add')" />
    </div>
  </div>
</template>

<style scoped>
@import url("./sizer.css");
</style>
