<script lang="ts" setup>
import { dateOffset } from "@/utils"
import type { CheckBarInfo, CheckBoxValue, DropData } from "@/views/components"
import {
  PageHeader,
  SizerCheckBar,
  SizerCheckBox,
  SizerDatePicker,
  SizerDropMenu,
} from "@/views/components"

import GroundMap from "./GroundMap.vue"
import { checkBarClassify, checkBoxItems, checkLayerTypes, dropMenus } from "./config"

const classifyCheckInfo = reactive<CheckBarInfo>({
  checkName: checkBarClassify[0].name,
}) // 筛选信息

const layersCheckInfo = reactive<CheckBarInfo>({
  checkName: checkLayerTypes[0].name,
}) // 图层类型信息

const dropData = ref<DropData>({}) // 下拉框信息
const currentDate = ref(dateOffset({ format: "YYYY-MM-DD HH" })) // 时间信息
const currentChecks = ref<CheckBoxValue[]>(["normal"]) // 站点筛选信息
</script>

<template>
  <div class="flex h-full flex-col">
    <PageHeader>
      <template #center>
        <div class="text-sm">四川省国家站降水观测数据</div>
        <div class="text-xs leading-[14px]">
          {{ dateOffset({ format: "YYYY年MM月DD日HH时" }) }}BJT
        </div>
        <div class="text-xs leading-[14px]">{{ classifyCheckInfo.checkText }}</div>
      </template>
    </PageHeader>

    <div class="mb-2">
      <SizerDropMenu v-model="dropData" :config="dropMenus" />
      <SizerCheckBar v-model="classifyCheckInfo" :config="checkBarClassify" class="my-2" />
      <SizerCheckBar
        v-model="layersCheckInfo"
        class="w-2/5 max-w-[200px]"
        :config="checkLayerTypes"
      />
    </div>

    <GroundMap class="flex-1" />

    <div class="px-2 pb-2">
      <SizerDatePicker v-model="currentDate" />
      <SizerCheckBox v-model="currentChecks" :config="checkBoxItems" />
    </div>
  </div>
</template>
