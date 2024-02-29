<script lang="ts" setup>
import { cloneDeep } from "lodash-es"

import { BaseTable } from "@/base-ui"
import { ContentTitle, FetchTime } from "@/components"
import { typeOptions } from "@/global"
import { useTableResizeObserver } from "@/hooks"
import { nasApi } from "@/services"
import type { ListResponseItem } from "@/services/nas/types"
import { dateOffset } from "@/utils"

import { tableConfig } from "../config/table"

const currentTableConfig = reactive(cloneDeep(tableConfig))

const tableContainerRef = ref<HTMLDivElement>()
const tableRef = ref<InstanceType<typeof BaseTable>>()

const tableData = ref<ListResponseItem[]>([])
const tableTotal = ref(0)
const tableLoading = ref(false)
const fetchTime = ref<string>()

async function fetchListData() {
  if (!tableRef.value) return

  if (import.meta.env.DEV) {
    const res = await import("@/views/a-json/nas.json")
    tableData.value = res?.data ?? []
    tableTotal.value = res?.total ?? 0
    return
  }

  tableLoading.value = true

  nasApi
    .fetchList()
    .then(res => {
      if (res?.code === 200) {
        tableData.value = res?.data ?? []
        tableTotal.value = res?.total ?? 0
        fetchTime.value = dateOffset({ utc: true, format: "HH:mm:ss" })
      }
    })
    .catch(error => console.error(error))
    .finally(() => (tableLoading.value = false))
}

// ===== 获取列表高度 =====
useTableResizeObserver(tableContainerRef, currentTableConfig, 40)

onMounted(() => fetchListData())
</script>

<template>
  <div class="flex h-full flex-col">
    <ContentTitle>
      <div class="flex h-full items-center justify-between">
        <div class="mr-2">NAS列表</div>
        <FetchTime :loading="tableLoading" :time="fetchTime" @refresh="fetchListData" />
      </div>
    </ContentTitle>

    <div ref="tableContainerRef" v-loading="tableLoading" class="flex-1">
      <BaseTable ref="tableRef" :config="currentTableConfig" :data="tableData" :count="tableTotal">
        <template #type="scope">
          {{ typeOptions.getLabel(scope.type) }}
        </template>
      </BaseTable>
    </div>
  </div>
</template>
