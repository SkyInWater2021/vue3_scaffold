<script lang="ts" setup>
import type { CheckBarInfo, CheckBarItem, CheckBarValue } from "./types"

const props = defineProps<{ config: CheckBarItem[] }>()
const modelInfo = defineModel<CheckBarInfo>({ required: true })

function initCheckInfo() {
  const options = getOptions()
  modelInfo.value.options = options
  modelInfo.value.checkValue = options[0]?.value
  modelInfo.value.checkText = getCurrentCheckText()
}
initCheckInfo()

function getOptions() {
  const name = modelInfo.value.checkName
  return props.config.find(item => item.name === name)?.options ?? []
}
function getCurrentCheckText() {
  const { options, checkValue } = modelInfo.value
  return (options ?? []).find(item => item.value === checkValue)?.text ?? "-"
}

const showPicker = ref(false)
const changePicker = (visible: boolean) => (showPicker.value = visible)
function handleClassifyClick(item: CheckBarItem) {
  modelInfo.value.checkName = item.name
  const options = getOptions()
  if (options.length > 0) {
    modelInfo.value.options = options
    changePicker(true)
  } else {
    isConfirm.value = true
    lastClassifyName = modelInfo.value.checkName
  }
}

const isConfirm = ref(false) // 是否点击了确定按钮
let lastClassifyName = modelInfo.value.checkName // 保存上一次点击选项
function handlePickerConfirm(v: { selectedValues: [CheckBarValue] }) {
  modelInfo.value.checkValue = v.selectedValues[0]
  modelInfo.value.checkText = getCurrentCheckText()
  isConfirm.value = true
  lastClassifyName = modelInfo.value.checkName
  changePicker(false)
}
watchEffect(() => {
  if (!showPicker.value && !isConfirm.value) {
    modelInfo.value.checkName = lastClassifyName
  }
  // 如果没有点击确定,则恢复之前的options
  modelInfo.value.options = getOptions()
  // 重置确定标识
  isConfirm.value = false
})
</script>

<template>
  <div class="">
    <div class="classify-wrapper">
      <div
        v-for="item in config"
        :key="item.title"
        class="classify-item"
        :class="{ 'is-active': item.name === modelInfo.checkName }"
        @click="handleClassifyClick(item)"
      >
        {{ item.title }}
      </div>
    </div>

    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
        :columns="modelInfo.options"
        :title="modelInfo.checkName"
        @cancel="changePicker(false)"
        @confirm="handlePickerConfirm"
      />
    </van-popup>
  </div>
</template>

<style scoped>
.classify-wrapper {
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
  overflow: hidden;
  font-size: 12px;
  border: 1px solid var(--van-gray-4);
  border-radius: 20px;
}

.classify-item {
  flex: 1;
  min-width: fit-content;
  padding: 2px;
  text-align: center;
}

.classify-item.is-active {
  color: white;
  background-color: var(--van-blue);
}
</style>
