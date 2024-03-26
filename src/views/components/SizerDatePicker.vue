<script lang="ts" setup>
import { dateOffset } from "@/utils/format-date"

interface PropType {
  formatted?: "YYYY-MM-DD HH" | "YYYY-MM-DD"
  showArrow?: boolean
  label?: string
  pickerWidth?: number
}
const props = withDefaults(defineProps<PropType>(), {
  formatted: "YYYY-MM-DD HH",
  showArrow: true,
  pickerWidth: 150,
})

const currentDate = defineModel<string>({ default: "", required: true })
const currentPickerDate = ref<string[]>([])
const currentPickerHour = ref<string[]>([])
const showHour = computed(() => props.formatted === "YYYY-MM-DD HH")

const showDatePicker = ref(false)
function changeDatePicker(visible: boolean, isConfirm = false) {
  if (isConfirm) {
    const dateStr = currentPickerDate.value.join("-")
    if (showHour.value) {
      currentDate.value = dateStr + " " + currentPickerHour.value[0]
    } else currentDate.value = dateStr
  } else getCurrentPickerInfo()
  showDatePicker.value = visible
}

function getCurrentPickerInfo() {
  currentPickerDate.value = currentDate.value.slice(0, 11).split("-")
  if (showHour.value) currentPickerHour.value = [currentDate.value.slice(-2)]
}
getCurrentPickerInfo()

function changeDate(direction: "forward" | "back") {
  if (direction === "forward") {
    const nowStamp = Date.now()
    const timeFill = showHour.value ? ":00:00" : " 00:00:00"
    const currentStamp = new Date(currentDate.value + timeFill).getTime()
    let maxTimeStamp = 1000 * 60 * 60
    if (!showHour.value) maxTimeStamp *= 24
    if (nowStamp - currentStamp <= maxTimeStamp) return
  }

  currentDate.value = dateOffset({
    startTime: currentDate.value,
    offset: direction === "back" ? -1 : 1,
    offsetType: showHour.value ? "hour" : "day",
    format: props.formatted,
  })
  getCurrentPickerInfo()
}
</script>

<template>
  <div class="">
    <div class="flex items-center">
      <van-button
        v-if="showArrow"
        size="small"
        icon="arrow-left"
        class="!h-[26px]"
        @click="changeDate('back')"
      />
      <div :style="{ width: pickerWidth + 'px' }">
        <van-field
          v-model="currentDate"
          label-width="fit-content"
          readonly
          colon
          name="borderPicker"
          :label="label"
          @click="changeDatePicker(true)"
        />
      </div>
      <van-button
        v-if="showArrow"
        size="small"
        icon="arrow"
        class="!h-[26px]"
        @click="changeDate('forward')"
      />
    </div>

    <van-popup v-model:show="showDatePicker" position="bottom">
      <van-picker-group
        v-if="showHour"
        :tabs="['选择日期', '选择时间']"
        next-step-text="下一步"
        @confirm="changeDatePicker(false, true)"
        @cancel="changeDatePicker(false)"
      >
        <van-date-picker v-model="currentPickerDate" :max-date="new Date()" />
        <van-time-picker v-model="currentPickerHour" :columns-type="['hour']" />
      </van-picker-group>

      <van-date-picker
        v-else
        v-model="currentPickerDate"
        :max-date="new Date()"
        @confirm="changeDatePicker(false, true)"
        @cancel="changeDatePicker(false)"
      />
    </van-popup>
  </div>
</template>
