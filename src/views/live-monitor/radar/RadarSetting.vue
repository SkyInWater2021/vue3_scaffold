<script lang="ts" setup>
import { cloneDeep } from "lodash-es"

import { classifyOptions, pageOptions, radarOptions, speedOptions } from "./config"

const props = defineProps<{ confirm?: () => void }>()

const formData = ref({
  isLoop: false,
  speed: speedOptions[speedOptions.length - 1].value,
  classify: classifyOptions[0].value,
  radar: radarOptions[0].value,
  page: pageOptions[0].value,
})

let originFormData = cloneDeep(formData.value) // 重置formData
const handleCancel = () => (formData.value = originFormData)
const handleConfirm = () => props.confirm?.()

const showDialog = ref(false)
const changeOverlay = (visible: boolean) => {
  if (visible) originFormData = cloneDeep(formData.value)
  showDialog.value = visible
}

defineExpose({
  changeOverlay,
  formData,
})
</script>

<template>
  <van-dialog
    v-model:show="showDialog"
    show-cancel-button
    @cancel="handleCancel"
    @confirm="handleConfirm"
  >
    <div class="px-2.5">
      <van-form>
        <van-field name="switch" label="是否循环播放">
          <template #input>
            <van-switch v-model="formData.isLoop" size="20px" />
          </template>
        </van-field>

        <van-field name="radio" label="播放速度" label-align="top">
          <template #input>
            <van-radio-group v-model="formData.speed" direction="horizontal">
              <van-radio
                v-for="option in speedOptions"
                :key="option.text"
                :name="option.value"
                class="mb-2.5"
              >
                {{ option.text }}
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field name="radio" label="分类" label-align="top">
          <template #input>
            <van-radio-group v-model="formData.classify" direction="horizontal">
              <van-radio
                v-for="option in classifyOptions"
                :key="option.text"
                :name="option.value"
                class="mb-2.5"
              >
                {{ option.text }}
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field name="radio" label="雷达产品" label-align="top">
          <template #input>
            <van-radio-group v-model="formData.radar" direction="horizontal">
              <van-radio
                v-for="option in radarOptions"
                :key="option.text"
                :name="option.value"
                class="mb-2.5"
              >
                {{ option.text }}
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field name="radio" label="图片页面(页)" label-align="top">
          <template #input>
            <van-radio-group v-model="formData.page" direction="horizontal">
              <van-radio
                v-for="option in pageOptions"
                :key="option.text"
                :name="option.value"
                class="mb-2.5"
              >
                {{ option.text }}
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </van-form>
    </div>
  </van-dialog>
</template>
