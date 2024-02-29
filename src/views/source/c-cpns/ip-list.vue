<script lang="ts" setup>
import { cloneDeep } from "lodash-es"

import { BaseTable } from "@/base-ui"
import { typeOptions } from "@/global"
import { useTableResizeObserver } from "@/hooks"
import { sourceApi } from "@/services"
import type { ListResponseItem } from "@/services/source/types"
import { dateOffset } from "@/utils"

import { tableConfig } from "../config/table"

const emit = defineEmits(["tagAdd"])

const currentTableConfig = reactive(cloneDeep(tableConfig))
const currentHostIp = ref("")

const tableContainerRef = ref<HTMLDivElement>()
const tableRef = ref<InstanceType<typeof BaseTable>>()

const tableData = ref<ListResponseItem[]>([])
const tableTotal = ref(0)
const tableLoading = ref(false)
const fetchTime = ref<string>()

async function fetchListData() {
  if (!tableRef.value) return

  tableLoading.value = true

  sourceApi
    .queryThirdResourceList({ hostIp: currentHostIp.value })
    .then(res => {
      if (res?.code === 200) {
        tableData.value = res?.data ?? []
        tableTotal.value = res?.total ?? 0
        fetchTime.value = dateOffset({ utc: true, format: "HH:mm:ss" })
        fetchListHook(tableData.value)
      }
    })
    .catch(error => console.error(error))
    .finally(() => (tableLoading.value = false))
}

// ===== 单元格合并 =====
const hostIpSpanRecord = ref<number[]>([])
const hostNameSpanRecord = ref<number[]>([])
const SPAN_HOST_IP = "hostIp"
const SPAN_HOST_NAME = "hostName"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function changeSpanRecord(data: any[], key1: string, key2?: string) {
  let pos = 0
  const spanRecord = [1]

  for (let i = 1; i < data.length; i++) {
    if (
      data[i][key1] === data[i - 1][key1] &&
      (key2 === undefined || data[i][key2] === data[i - 1][key2])
    ) {
      spanRecord[pos] += 1
      spanRecord.push(0)
    } else {
      spanRecord.push(1)
      pos = i
    }
  }

  return spanRecord
}

function addTableEvents() {
  currentTableConfig.tableConfig.spanMethod = data => {
    const { rowIndex, columnIndex } = data

    if (columnIndex === 0) {
      const _row = hostIpSpanRecord.value[rowIndex]
      const _col = _row > 0 ? 1 : 0
      return { rowspan: _row, colspan: _col }
    }

    if (columnIndex === 1) {
      const _row = hostNameSpanRecord.value[rowIndex]
      const _col = _row > 0 ? 1 : 0
      return { rowspan: _row, colspan: _col }
    }

    return [1, 1]
  }
}

function fetchListHook(data: ListResponseItem[]) {
  hostIpSpanRecord.value = changeSpanRecord(data, SPAN_HOST_IP)
  hostNameSpanRecord.value = changeSpanRecord(data, SPAN_HOST_NAME)
}

async function handleIpClick(rowData: ListResponseItem) {
  const tagName = `IP：${rowData.hostIp}`
  emit("tagAdd", { ...rowData, tagName })
}

// ===== 获取列表高度 =====
useTableResizeObserver(tableContainerRef, currentTableConfig, 40)

addTableEvents()
onMounted(() => fetchListData())

defineExpose({
  fetchListData,
  fetchTime,
  tableLoading,
})
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="mb-2.5 mt-1">
      <span class="mr-2">主机IP:</span>
      <el-input
        v-model="currentHostIp"
        placeholder="请输入主机IP"
        class="!w-[200px]"
        @change="fetchListData"
      />
    </div>

    <div ref="tableContainerRef" v-loading="tableLoading" class="flex-1">
      <BaseTable ref="tableRef" :config="currentTableConfig" :data="tableData" :count="tableTotal">
        <template #hostIp="scope">
          <span class="hole-enable" @click="handleIpClick(scope)">
            {{ scope.hostIp }}
          </span>
        </template>

        <template #type="scope">
          {{ typeOptions.getLabel(scope.type) }}
        </template>
      </BaseTable>
    </div>
  </div>
</template>
