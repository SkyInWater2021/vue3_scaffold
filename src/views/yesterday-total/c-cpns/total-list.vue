<script lang="ts" setup>
import { cloneDeep } from "lodash-es"

import { BaseTable } from "@/base-ui"
import { ContentTitle, FetchTime } from "@/components"
import { useTableResizeObserver } from "@/hooks"
import { yesterdayTotalApi } from "@/services"
import type { TotalItem } from "@/services/yesterday-total/types"
import { addCommasToNumber, dateOffset, formatDate, formatFileSize } from "@/utils"

import { totalTableConfig } from "../config"

const emit = defineEmits<{ typeClick: [code: string] }>()

const radioOptions = ["收集总量", "分发总量"]
const currentType = ref(radioOptions[0])

const currentTableConfig = reactive(cloneDeep(totalTableConfig))
const currentTotalInfo = ref<TotalItem>()
const tableContainerRef = ref<HTMLDivElement>()
const tableRef = ref<InstanceType<typeof BaseTable>>()
const tableData = ref<TotalItem[]>([])
const tableTotal = ref(0)
const tableLoading = ref(false)
const fetchTime = ref<string>()

async function fetchListData() {
  if (!tableRef.value) return

  // if (import.meta.env.DEV) {
  //   const res = await (currentType.value.includes("收集")
  //     ? import("@/views/a-json/3.6.col.sum.json")
  //     : import("@/views/a-json/3.6.dist.sum.json"))

  //   tableData.value = (res?.data ?? []).filter(item => {
  //     if (item.DATA_TYPE === null) currentTotalInfo.value = { ...item }
  //     return item.DATA_TYPE !== null
  //   })
  //   tableTotal.value = res?.total ?? 0
  //   fetchTime.value = dateOffset({ utc: true, format: "HH:mm:ss" })

  //   return
  // }

  const { currentPage, pageSize } = tableRef.value
  const fetchApi = currentType.value.includes("收集")
    ? yesterdayTotalApi.fetchColTotal
    : yesterdayTotalApi.fetchDistTotal

  tableLoading.value = true
  fetchApi([currentPage * pageSize - pageSize, currentPage * pageSize])
    .then(res => {
      if (res.code === 200) {
        tableData.value = (res?.data ?? []).filter(item => {
          if (item.DATA_TYPE === null) currentTotalInfo.value = { ...item }
          return item.DATA_TYPE !== null
        })
        tableTotal.value = res?.total ?? 0
        fetchTime.value = dateOffset({ utc: true, format: "HH:mm:ss" })
      }
    })
    .catch(error => console.error(error))
    .finally(() => (tableLoading.value = false))
}

// 分页器事件
currentTableConfig.paginationConfig!.events = {
  change: fetchListData,
}

// ===== 获取列表高度 =====
useTableResizeObserver(tableContainerRef, currentTableConfig, 40)

// ===== 四级编码点击 =====
const handleTypeClick = (data: TotalItem) => emit("typeClick", data["DATA_TYPE"] as string)

onMounted(() => fetchListData())
</script>

<template>
  <div class="flex h-full flex-col">
    <ContentTitle>
      <div class="flex items-center justify-between">
        <el-radio-group v-model="currentType" class="mr-2.5" @change="fetchListData">
          <el-radio v-for="item in radioOptions" :key="item" :label="item">
            {{ item }}
          </el-radio>
        </el-radio-group>

        <div class="flex flex-1 items-center justify-center">
          <span>
            时间：{{ formatDate(String(currentTotalInfo?.["PERIOD_DATE"] ?? ""), "YYYY-MM-DD") }}
          </span>

          <el-divider direction="vertical" />

          <el-popover placement="bottom" trigger="hover" :width="250">
            <template #reference>
              <span class="cursor-pointer">
                总量 ≈ {{ formatFileSize(currentTotalInfo?.["FILESIZE_COUNT"] ?? 0)?.fullValue }}
              </span>
            </template>
            <div class="text-center">
              {{ addCommasToNumber(currentTotalInfo?.["FILESIZE_COUNT"] as number) }}
              <span class="ml-1">Byte</span>
            </div>
          </el-popover>

          <el-divider direction="vertical" />

          <el-popover placement="bottom" trigger="hover" :width="250">
            <template #reference>
              <span class="cursor-pointer">
                平均量 ≈ {{ formatFileSize(currentTotalInfo?.["FILESIZE_AVG"] ?? 0)?.fullValue }}
              </span>
            </template>
            <div class="text-center">
              {{ addCommasToNumber(currentTotalInfo?.["FILESIZE_AVG"] as number) }}
              <span class="ml-1">Byte</span>
            </div>
          </el-popover>
        </div>

        <FetchTime :loading="tableLoading" :time="fetchTime" @refresh="fetchListData" />
      </div>
    </ContentTitle>

    <div ref="tableContainerRef" v-loading="tableLoading" class="flex-1">
      <BaseTable ref="tableRef" :config="currentTableConfig" :data="tableData" :count="tableTotal">
        <template #dataType="scope">
          <span class="hole-enable" @click="handleTypeClick(scope)">{{ scope["DATA_TYPE"] }}</span>
        </template>

        <template #total="scope">
          <span>{{ addCommasToNumber(scope["FILESIZE_COUNT"]) }} Byte</span>
          <span> ≈ </span>
          <span> {{ formatFileSize(scope["FILESIZE_COUNT"])?.fullValue }} </span>
        </template>

        <template #avg="scope">
          <span>{{ addCommasToNumber(scope["FILESIZE_COUNT"]) }} Byte</span>
          <span> ≈ </span>
          <span> {{ formatFileSize(scope["FILESIZE_COUNT"])?.fullValue }} </span>
        </template>
      </BaseTable>
    </div>
  </div>
</template>
