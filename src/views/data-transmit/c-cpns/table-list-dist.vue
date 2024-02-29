<script lang="ts" setup>
import { cloneDeep } from "lodash-es"

import { BaseTable } from "@/base-ui"
import { ContentTitle, FetchTime } from "@/components"
import { useTableResizeObserver } from "@/hooks"
import { dataTransApi } from "@/services"
import type { DataTransItem } from "@/services/data-transmit/types"
import { addCommasToNumber, dateOffset, formatDate, formatFileSize } from "@/utils"

import { distTableConfig, distTableExpandConfig } from "../config/table"

const currentTableConfig = reactive(cloneDeep(distTableConfig))
const currentExpandTableConfig = reactive(cloneDeep(distTableExpandConfig))

const tableContainerRef = ref<HTMLDivElement>()
const tableRef = ref<InstanceType<typeof BaseTable>>()
const tableResponseData = ref<DataTransItem[]>()
const tableTotal = ref(0)
const loading = ref(false)
const fetchTime = ref<string>()
function fetchListData() {
  if (import.meta.env.DEV) {
    import("@/views/a-json/3.5.dist.json").then(res => {
      tableResponseData.value = res?.data as unknown as DataTransItem[]
      tableTotal.value = res.total ?? 0
      loading.value = false
    })

    return
  }

  loading.value = true
  dataTransApi
    .fetchDist()
    .then(res => {
      if (res.code === 200) {
        tableResponseData.value = res?.data
        tableTotal.value = res.total ?? 0
        fetchTime.value = dateOffset({ utc: true, format: "HH:mm:ss" })
      }
    })
    .catch(error => console.error(error))
    .finally(() => (loading.value = false))
}

const currentTableData = computed(() => {
  if (!tableRef.value) return []
  const { pageSize, currentPage } = tableRef.value
  return tableResponseData.value?.slice(currentPage * pageSize - pageSize, currentPage * pageSize)
})

// ===== 展开行 =====
const expandRow = ref() // 当前展开行的数据
function addTableExpand() {
  currentTableConfig.tableConfig.rowKey = "DATA_TYPE_FIRST"
  currentTableConfig.tableConfig.expandRowKeys = []

  if (currentTableConfig.tableConfig.propList[0]?.type !== "expand") {
    currentTableConfig.tableConfig.propList.unshift({ type: "expand", columnSlotName: "expand" })
  }

  currentTableConfig.tableConfig.events = {
    "expand-change": (row, expandRows) => {
      expandRow.value = expandRows.length === 0 ? undefined : row
      currentTableConfig.tableConfig.expandRowKeys = [expandRow.value?.DATA_TYPE_FIRST]
    },
  }
}

// ===== 获取列表高度 =====
useTableResizeObserver(tableContainerRef, currentTableConfig)

addTableExpand()
onMounted(() => fetchListData())
</script>

<template>
  <div class="flex h-full flex-col">
    <ContentTitle>
      <div class="flex h-full items-center justify-between">
        <div>
          <span class="mr-2.5">分发</span>
          <span>
            {{ formatDate(String(currentTableData?.[0]?.PERIOD_DATE ?? ""), "YYYY-MM-DD") }}
          </span>
        </div>

        <FetchTime :loading="loading" :time="fetchTime" @refresh="fetchListData" />
      </div>
    </ContentTitle>

    <div ref="tableContainerRef" v-loading="loading" class="flex-1">
      <BaseTable
        ref="tableRef"
        :config="currentTableConfig"
        :data="currentTableData"
        :count="tableTotal"
      >
        <template #fileSizeCount="scope">
          <span>{{ addCommasToNumber(scope["FILESIZE_COUNT"]) }} Byte</span>
          <span> ≈ </span>
          <span> {{ formatFileSize(scope["FILESIZE_COUNT"])?.fullValue }} </span>
        </template>

        <template #fileCount="scope">
          <span> {{ addCommasToNumber(scope["FILE_COUNT"]) ?? 0 }} 个 </span>
        </template>

        <template #expand="scope">
          <div class="com-floodlit-box px-5 py-2.5">
            <BaseTable :config="currentExpandTableConfig" :data="JSON.parse(scope.detail)">
              <template #fileSizeCount="scope">
                <span>{{ addCommasToNumber(scope["FILESIZE_COUNT"]) }} Byte</span>
                <span> ≈ </span>
                <span> {{ formatFileSize(scope["FILESIZE_COUNT"])?.fullValue }} </span>
              </template>

              <template #fileCount="scope">
                <span> {{ addCommasToNumber(scope["FILE_COUNT"]) ?? 0 }} 个 </span>
              </template>

              <template #userName="scope">
                <span> {{ scope["USER_ID_NAME"] }} </span>
                <span> ({{ scope["USER_ID"] }} )</span>
              </template>
            </BaseTable>
          </div>
        </template>
      </BaseTable>
    </div>
  </div>
</template>
