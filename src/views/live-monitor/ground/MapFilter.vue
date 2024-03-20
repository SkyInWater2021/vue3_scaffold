<script lang="ts" setup>
import { dateOffset } from "@/utils"

const DATE_FORMAT = "YYYY-MM-DD HH"
const checks = [
  { name: "stationName", text: "站名" },
  { name: "stationNum", text: "站号" },
  { name: "normal", text: "正确" },
  { name: "error", text: "错误", disable: true },
  { name: "dubious", text: "可疑", disable: true },
]
const currentChecks = ref(["stationNum"])

const currentDate = ref(dateOffset({ offset: -2, format: DATE_FORMAT }))
const currentPickerDate = ref<string[]>([])
const currentPickerHour = ref<string[]>([])

const showDatePicker = ref(false)

function changeDatePicker(visible: boolean, isConfirm = false) {
  if (isConfirm) {
    currentDate.value = currentPickerDate.value.join("-") + " " + currentPickerHour.value[0]
  } else getCurrentPickerInfo()

  showDatePicker.value = visible
}

function getCurrentPickerInfo() {
  currentPickerDate.value = currentDate.value.slice(0, 11).split("-")
  currentPickerHour.value = currentDate.value.slice(-2).split(" ")
}
getCurrentPickerInfo()

function changeDate(direction: "forward" | "back") {
  if (direction === "forward") {
    const nowStamp = Date.now()
    const currentStamp = new Date(currentDate.value + ":00:00").getTime()
    if (nowStamp - currentStamp <= 1000 * 60 * 60) return
  }

  currentDate.value = dateOffset({
    startTime: currentDate.value,
    offset: direction === "back" ? -1 : 1,
    format: DATE_FORMAT,
  })
  getCurrentPickerInfo()
}

defineExpose({
  currentChecks,
})
</script>

<template>
  <div class="px-2.5 pt-2">
    <van-checkbox-group
      v-model="currentChecks"
      shape="square"
      direction="horizontal"
      icon-size="22"
    >
      <van-checkbox
        v-for="item in checks"
        :key="item.text"
        :name="item.name"
        :disabled="item.disable"
      >
        {{ item.text }}
      </van-checkbox>
    </van-checkbox-group>

    <div class="flex items-center">
      <van-button size="small" icon="arrow-left" @click="changeDate('back')" />
      <div class="w-[200px]">
        <van-field
          label-width="fit-content"
          v-model="currentDate"
          readonly
          name="datePicker"
          @click="changeDatePicker(true)"
        />
      </div>
      <van-button size="small" icon="arrow" @click="changeDate('forward')" />
    </div>

    <van-popup v-model:show="showDatePicker" position="bottom">
      <van-picker-group
        :tabs="['选择日期', '选择时间']"
        next-step-text="下一步"
        @confirm="changeDatePicker(false, true)"
        @cancel="changeDatePicker(false)"
      >
        <van-date-picker v-model="currentPickerDate" :max-date="new Date()" />
        <van-time-picker v-model="currentPickerHour" :columns-type="['hour']" />
      </van-picker-group>
    </van-popup>
  </div>
</template>
