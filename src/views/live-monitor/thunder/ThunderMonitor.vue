<script lang="ts" setup>
import { dateOffset } from "@/utils/format-date"
import type { CheckBarInfo, DropData } from "@/views/components"
import { PageHeader, SizerCheckBar, SizerDatePicker, SizerDropMenu } from "@/views/components"

import ThunderMap from "./ThunderMap.vue"
import { dropMenus, thunderTypes } from "./config"

const currentThunderTypeInfo = reactive<CheckBarInfo>({
  checkName: thunderTypes[0].name,
}) // 雷电定位类型

const dropData = ref<DropData>({}) // 下拉框信息

const startTime = ref(dateOffset({ format: "YYYY-MM-DD HH" })) // 开始时间
const endTime = ref(dateOffset({ offset: -1, offsetType: "day", format: "YYYY-MM-DD HH" }))

const showToast = ref(false)
function handleQueryClick() {
  const regexp = /-|\s/g
  const startNum = startTime.value.replace(regexp, "")
  const endNum = endTime.value.replace(regexp, "")
  if (startNum > endNum) {
    showToast.value = true
    return
  }
  // TODO 查询
  // ...
}
</script>

<template>
  <div class="flex h-full flex-col">
    <PageHeader title="闪电监控" />

    <div class="mb-2">
      <SizerDropMenu v-model="dropData" :config="dropMenus" />

      <SizerCheckBar
        v-model="currentThunderTypeInfo"
        class="mt-2 w-3/5 max-w-[300px]"
        :config="thunderTypes"
      />
    </div>

    <ThunderMap class="flex-1" />

    <div class="flex flex-wrap items-center px-2">
      <SizerDatePicker
        v-model="startTime"
        label="开始时间"
        :picker-width="220"
        :show-arrow="false"
      />
      <SizerDatePicker v-model="endTime" label="结束时间" :picker-width="220" :show-arrow="false" />

      <van-button
        size="small"
        type="primary"
        style="height: 26px; margin-left: 10px"
        @click="handleQueryClick"
      >
        查询
      </van-button>

      <van-toast v-model:show="showToast" style="padding: 0">
        <template #message> <div class="p-2.5">开始时间不能大于结束时间</div> </template>
      </van-toast>
    </div>
  </div>
</template>
