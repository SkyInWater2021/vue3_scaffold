<script lang="ts" setup>
import { cloneDeep } from "lodash-es"

import { BaseTable } from "@/base-ui"
import { ContentTitle, FetchTime } from "@/components"
import { useTableResizeObserver } from "@/hooks"
import { warningListApi } from "@/services"
import type { WarningListItem } from "@/services/warning-list/types"
import { dateOffset, formatDate } from "@/utils"

import { tableConfig } from "../config/table"

const currentTableConfig = reactive(cloneDeep(tableConfig))

const tableContainerRef = ref<HTMLDivElement>()
const tableRef = ref<InstanceType<typeof BaseTable>>()

const tableData = ref<WarningListItem[]>([])
const tableTotal = ref(0)
const loading = ref(false)
const fetchTime = ref<string>()

function fetchListData() {
  // ! 本地调试数据
  if (import.meta.env.DEV) {
    import("@/views/a-json/3.9.ei告警列表.json").then(res => {
      tableData.value = res?.data ?? []
      tableTotal.value = res?.total ?? 0
      fetchTime.value = dateOffset({ utc: true, format: "HH:mm:ss" })
    })

    return
  }

  if (!tableRef.value) return

  const { currentPage, pageSize } = tableRef.value

  loading.value = true
  warningListApi
    .fetchList([currentPage * pageSize - pageSize, currentPage * pageSize])
    .then(res => {
      if (res.code === 200) {
        tableData.value = res?.data ?? []
        tableTotal.value = res?.total ?? 0
        fetchTime.value = dateOffset({ utc: true, format: "HH:mm:ss" })
      }
    })
    .catch(error => console.error(error))
    .finally(() => (loading.value = false))
}

// 分页器事件
currentTableConfig.paginationConfig!.events = {
  change: fetchListData,
}

// ===== 获取列表高度 =====
useTableResizeObserver(tableContainerRef, currentTableConfig, 40)

onMounted(() => fetchListData())
</script>

<template>
  <div class="flex h-full flex-col">
    <ContentTitle>
      <div class="flex h-full items-center justify-between">
        <div>告警列表</div>

        <FetchTime :loading="loading" :time="fetchTime" @refresh="fetchListData" />
      </div>
    </ContentTitle>

    <div ref="tableContainerRef" v-loading="loading" class="flex-1">
      <BaseTable ref="tableRef" :config="currentTableConfig" :data="tableData" :count="tableTotal">
        <template #occur_time="scope">
          {{ formatDate(scope.occur_time) }}
        </template>
      </BaseTable>
    </div>
  </div>
</template>
