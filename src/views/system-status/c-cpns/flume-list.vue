<script lang="ts" setup>
import { cloneDeep } from "lodash-es"

import { BaseTable } from "@/base-ui"
import { useTableResizeObserver } from "@/hooks"
import { systemStatusFRApi } from "@/services"
import type { FlumeListResponse } from "@/services/system-status/types"
import { dateOffset } from "@/utils"

import { FlumeTableConfig } from "../config/table"

const emit = defineEmits(["tagAdd"])

const currentTableConfig = reactive(cloneDeep(FlumeTableConfig))

const fetchTime = ref("")
const tableContainerRef = ref<HTMLDivElement>()
const tableRef = ref<InstanceType<typeof BaseTable>>()
const tableResponseData = ref<FlumeListResponse["list"]>()
const tableTotal = ref(0)
const tableLoading = ref(false)
function fetchListData() {
  if (!tableRef.value) return

  const { currentPage, pageSize } = tableRef.value
  tableLoading.value = true
  systemStatusFRApi
    .queryThirdFlumeColonyLists({ limit: pageSize, page: currentPage })
    .then(res => {
      if (res?.code === 200) {
        tableResponseData.value = res?.data?.list
        tableTotal.value = res?.data?.total ?? 0
        fetchTime.value = dateOffset({ offset: -8, format: "HH:mm:ss" })
      }
    })
    .catch(error => console.error(error))
    .finally(() => (tableLoading.value = false))
}

function handleTagAdd(rowData: FlumeListResponse["list"][0]) {
  const tagName = `队列：${rowData.hostIp}:${rowData.port}`
  emit("tagAdd", { ...rowData, tagName })
}

// 分页器事件
currentTableConfig.paginationConfig!.events = {
  change: fetchListData,
}

useTableResizeObserver(tableContainerRef, currentTableConfig)
onMounted(() => fetchListData())

defineExpose({
  fetchListData,
  fetchTime,
  tableLoading,
})
</script>

<template>
  <div ref="tableContainerRef" v-loading="tableLoading">
    <BaseTable
      ref="tableRef"
      :config="currentTableConfig"
      :data="tableResponseData"
      :count="tableTotal"
    >
      <template #hostIp="scope">
        <span @click="handleTagAdd(scope)" class="hole-enable">
          {{ scope.hostIp }}
        </span>
      </template>
    </BaseTable>
  </div>
</template>
