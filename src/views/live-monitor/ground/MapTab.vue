<script lang="ts" setup>
import { classify } from "./config"
import { SizerForm } from "./types"

const props = defineProps<{
  sizerData?: SizerForm
}>()

const currentClassifyName = ref(classify[0].name)
let lastClassifyName = currentClassifyName.value // 保存上一次点击类别

const currentClassifyText = ref(getSizerOptions()[0].text)
const columns = ref(classify[0].options)

const showPicker = ref(false)
const changePicker = (visible: boolean) => (showPicker.value = visible)

function getSizerOptions() {
  const classifyInfo = classify.find(item => item.name === currentClassifyName.value)
  return classifyInfo?.options ?? []
}

function handleClassifyClick(item: (typeof classify)[number]) {
  currentClassifyName.value = item.name
  const options = getSizerOptions()
  if (options.length > 0) {
    // TODO 根据 props.sizerData筛选下拉选项
    console.log(props.sizerData)
    columns.value = options
    changePicker(true)
  }
}

const isConfirm = ref(false)
function handlePickerConfirm({ selectedValues }: any) {
  currentClassifyText.value = selectedValues[0]
  isConfirm.value = true
  changePicker(false)
  lastClassifyName = currentClassifyName.value
}

watchEffect(() => {
  if (!showPicker.value && !isConfirm.value) {
    currentClassifyName.value = lastClassifyName
  }
  isConfirm.value = false
})

watch(
  () => props.sizerData,
  () => {
    if (!props.sizerData) return
    // todo 重置所有选项和下拉框选项
    console.log(props.sizerData)
  },
  { deep: true, immediate: true },
)

// 当前图层类型
const layerTypes = ["站点数据", "色斑图"]
const currentLayerType = ref(layerTypes[0])
function handleLayerTypeChange(item: (typeof layerTypes)[number]) {
  currentLayerType.value = item
}

defineExpose({
  currentClassifyText,
  currentLayerType,
})
</script>

<template>
  <div class="">
    <div class="classify-wrapper mx-2.5 mb-2 flex items-center justify-between">
      <div
        v-for="item in classify"
        :key="item.title"
        class="classify-item"
        :class="{ 'is-active': item.name === currentClassifyName }"
        @click="handleClassifyClick(item)"
      >
        {{ item.title }}
      </div>
    </div>

    <div class="classify-wrapper mx-2.5 flex w-1/3 items-center justify-between">
      <div
        v-for="item in layerTypes"
        :key="item"
        class="classify-item"
        :class="{ 'is-active': item === currentLayerType }"
        @click="handleLayerTypeChange(item)"
      >
        {{ item }}
      </div>
    </div>

    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
        :columns="columns"
        :title="currentClassifyName"
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
