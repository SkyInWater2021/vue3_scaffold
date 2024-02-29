<script lang="ts" setup>
import { cloneDeep } from "lodash-es"

import { BaseTable } from "@/base-ui"
import { ContentTitle, FetchTime, SingleTendencyLine } from "@/components"
import { useTableResizeObserver } from "@/hooks"
import { liveTransApi } from "@/services"
import type { LiveTransItem } from "@/services/live-transmit/types"
import { addCommasToNumber, dateOffset, formatFileSize } from "@/utils"

import { singleCodeTableConfig } from "./config/single-code-list"

type TableRow = {
  [x: string]: { size: number; count: number } | string
  date: string
}

const props = defineProps<{ code: string; currentType: string }>()

const radioOptions = ["收集数量", "分发数量", "收集大小", "分发大小"]
const currentType = ref(props.currentType ?? radioOptions[0])

const currentTableConfig = reactive(cloneDeep(singleCodeTableConfig))
const tableContainerRef = ref<HTMLDivElement>()
const tableRef = ref<InstanceType<typeof BaseTable>>()
const tableData = ref<TableRow[]>([])
const tableTotal = ref(0)
const tableLoading = ref(false)
const fetchTime = ref<string>()

watch(
  () => props.currentType,
  () => {
    if (!props.currentType) return
    currentType.value = props.currentType
  },
)

async function fetchListData() {
  if (!tableRef.value) return

  if (import.meta.env.DEV) {
    if (currentType.value.includes("收集")) {
      const data = await import("@/views/a-json/3.4.5.json")
      changeTableConfig(data.data, data.total)
    }
    if (currentType.value.includes("分发")) {
      const data = await import("@/views/a-json/3.4.6.json")
      changeTableConfig(data.data, data.total)
    }
    tableLoading.value = false
    return
  }

  const fetchApi = currentType.value.includes("收集")
    ? liveTransApi.fetchSingleCodeCol
    : liveTransApi.fetchSingleCodeDist

  tableLoading.value = true
  fetchApi(props.code)
    .then(res => {
      if (res.code === 200) {
        changeTableConfig(res.data, res.total)
        fetchTime.value = dateOffset({ utc: true, format: "HH:mm:ss" })
      }
    })
    .catch(error => console.error(error))
    .finally(() => (tableLoading.value = false))
}

const popoverRef = ref()
const currentCellRef = ref()
const currentCellData = ref()
const popoverVisible = ref(false)
currentTableConfig.tableConfig.events = {
  "cell-mouse-enter": (row, column, cell) => {
    currentCellData.value = row[column["property"]]
    if (currentCellData.value?.size) {
      currentCellRef.value = cell
      popoverVisible.value = true
    }
  },
  "cell-mouse-leave": () => (popoverVisible.value = false),
}

const PROP_LIST_LENGTH = 1
function changeTableConfig(data: LiveTransItem[], total: number) {
  tableData.value.length = 0
  tableTotal.value = total ?? 0
  currentTableConfig.tableConfig.propList.length = PROP_LIST_LENGTH

  const columnNames: string[] = []

  data.forEach(item => {
    const dateStr = String(item.PERIOD_DATE)
    const date = dateStr.slice(0, dateStr.length - 2)

    if (!columnNames.includes(date)) {
      columnNames.push(date)
      tableData.value[columnNames.length - 1] = { date: date }
    }

    tableData.value[columnNames.length - 1][dateStr.slice(dateStr.length - 2)] = {
      count: item.FILE_COUNT,
      size: item.FILESIZE_COUNT,
    }
  })

  tableData.value[columnNames.length] = { date: "变化趋势", type: "isLine" }

  const currentWidth = tableContainerRef.value!.clientWidth

  Array.from({ length: 24 }, (_, index) => index.toString().padStart(2, "0"))
    .sort((a, b) => Number(a) - Number(b))
    .forEach(item => {
      currentTableConfig.tableConfig.propList.push({
        prop: item,
        align: "center",
        columnSlotName: item,
        label: item,
        width: Math.min(Math.max((currentWidth - 100) / 24, 50), 100),
      })
    })
}

const columnsData = computed(() => {
  return currentTableConfig.tableConfig.propList.slice(PROP_LIST_LENGTH)
})

// ===== 获取列表高度 =====
useTableResizeObserver(tableContainerRef, currentTableConfig, 20)

onMounted(() => fetchListData())
</script>

<template>
  <div class="flex h-full flex-col">
    <ContentTitle>
      <div class="flex h-full items-center justify-between">
        <el-radio-group v-model="currentType" class="mr-2.5" @change="fetchListData">
          <el-radio v-for="item in radioOptions" :key="item" :label="item">
            {{ item }}
          </el-radio>
        </el-radio-group>

        <FetchTime :loading="tableLoading" :time="fetchTime" @refresh="fetchListData" />
      </div>
    </ContentTitle>

    <div ref="tableContainerRef" v-loading="tableLoading" class="flex-1">
      <BaseTable ref="tableRef" :config="currentTableConfig" :data="tableData" :count="tableTotal">
        <template
          v-for="(item, index) in columnsData"
          :key="item.prop"
          #[item.columnSlotName!]="scope"
        >
          <SingleTendencyLine
            v-if="scope.type === 'isLine'"
            :tableData="tableData"
            :columnLabel="String(index).padStart(2, '0')"
            type="singleSize"
          />

          <template v-else>
            <div v-if="currentType.includes('大小')">
              <span>{{ formatFileSize(scope[item.prop!]?.size)?.value ?? "-" }}</span>
              <div
                v-if="formatFileSize(scope[item.prop!]?.size)?.unit"
                class="ml-[2px] text-[10px]"
              >
                {{ `(${formatFileSize(scope[item.prop!]?.size)?.unit})` }}
              </div>
            </div>

            <div v-if="currentType.includes('数量')">
              {{ addCommasToNumber(scope[item.prop!]?.count) ?? "-" }}
            </div>
          </template>
        </template>
      </BaseTable>
    </div>

    <el-popover
      ref="popoverRef"
      :virtual-ref="currentCellRef"
      v-model:visible="popoverVisible"
      trigger="click"
      virtual-triggering
    >
      <div v-if="currentType.includes('大小')" class="w-full text-center">
        {{ (currentCellData?.size ?? "-") + " Byte" }}
      </div>

      <div v-if="currentType.includes('数量')" class="w-full text-center">
        {{ (currentCellData?.count ?? "-") + " 个" }}
      </div>
    </el-popover>
  </div>
</template>

<style scoped>
:deep(.el-table .cell) {
  padding: 0 4px;
  font-size: 12px;
}
</style>
