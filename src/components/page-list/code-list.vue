<script lang="ts" setup>
import { cloneDeep } from "lodash-es"

import { BaseTable } from "@/base-ui"
import { ContentTitle, FetchTime, TendencyLine } from "@/components"
import { useTableResizeObserver } from "@/hooks"
import { liveTransApi, yesterdayTotalApi } from "@/services"
import type { LiveTransItem } from "@/services/live-transmit/types"
import { addCommasToNumber, dateOffset, formatFileSize } from "@/utils"

import { tableConfig } from "./config/code-list"

type TableRow = { [x: string]: { size: number; count: number } | string; type: string }

const props = defineProps<{ type?: string }>()
const emit = defineEmits<{ typeClick: [code: string, type: string] }>()

const radioOptions = ["收集数量", "分发数量", "收集大小", "分发大小"]
const currentType = ref(radioOptions[0])

const currentTableConfig = reactive(cloneDeep(tableConfig))
const tableContainerRef = ref<HTMLDivElement>()
const tableRef = ref<InstanceType<typeof BaseTable>>()
const tableData = ref<TableRow[]>([])
const tableTotal = ref(0)
const tableLoading = ref(false)
const fetchTime = ref<string>()

async function fetchListData() {
  if (!tableRef.value) return

  if (import.meta.env.DEV) {
    if (currentType.value.includes("收集")) {
      const data = await import("@/views/a-json/3.4.3.json")
      changeTableConfig(data.data, data.total)
    }
    if (currentType.value.includes("分发")) {
      const data = await import("@/views/a-json/3.4.4.json")
      changeTableConfig(data.data, data.total)
    }
    tableLoading.value = false
    return
  }

  tableLoading.value = true

  const { currentPage, pageSize } = tableRef.value
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let fetchApi: any = undefined
  if (props.type === "yesterdayTotal") {
    fetchApi = currentType.value.includes("收集")
      ? yesterdayTotalApi.fetchColCode
      : yesterdayTotalApi.fetchDistCode
  } else {
    fetchApi = currentType.value.includes("收集")
      ? liveTransApi.fetchCodeCol24
      : liveTransApi.fetchCodeDist24
  }

  fetchApi([currentPage * pageSize - pageSize, currentPage * pageSize])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((res: any) => {
      if (res.code === 200) {
        changeTableConfig(res.data, res.total)
        fetchTime.value = dateOffset({ utc: true, format: "HH:mm:ss" })
      }
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((error: any) => console.error(error))
    .finally(() => (tableLoading.value = false))
}

// 分页器事件
currentTableConfig.paginationConfig!.events = {
  change: fetchListData,
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
  "cell-mouse-leave": () => {
    popoverVisible.value = false
  },
}

const PROP_LIST_LENGTH = 2
function changeTableConfig(data: LiveTransItem[], total: number) {
  tableData.value.length = 0
  tableTotal.value = total ?? 0
  currentTableConfig.tableConfig.propList.length = PROP_LIST_LENGTH

  const columnNames: number[] = []

  const dataTypes: string[] = []
  data.forEach(item => {
    if (item.DATA_TYPE && !dataTypes.includes(item.DATA_TYPE)) {
      dataTypes.push(item.DATA_TYPE)
      tableData.value[dataTypes.length - 1] = { type: item.DATA_TYPE }
    }

    if (!columnNames.includes(item.PERIOD_DATE)) {
      columnNames.push(item.PERIOD_DATE)
    }

    tableData.value[dataTypes.length - 1][item.PERIOD_DATE] = {
      count: item.FILE_COUNT,
      size: item.FILESIZE_COUNT,
    }
  })

  if (currentType.value.includes("大小")) {
    currentTableConfig.tableConfig.propList[1]["columnSlotName"] = "sizeTendency"
  } else if (currentType.value.includes("数量")) {
    currentTableConfig.tableConfig.propList[1]["columnSlotName"] = "countTendency"
  }

  const currentWidth = tableContainerRef.value!.clientWidth

  columnNames
    .sort((a, b) => a - b)
    .forEach(item => {
      currentTableConfig.tableConfig.propList.push({
        prop: String(item),
        align: "center",
        columnSlotName: String(item),
        label: String(item).slice(6),
        width: Math.min(Math.max((currentWidth - 280) / columnNames.length, 45), 100),
      })
    })
}

// ===== 获取列表高度 =====
useTableResizeObserver(tableContainerRef, currentTableConfig, 40)

// ===== 四级编码点击 =====
const handleTypeClick = (data: TableRow) => {
  emit("typeClick", data.type, currentType.value)
}

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
        <template #type="scope">
          <span class="custom-type" @click="handleTypeClick(scope)">{{ scope.type }}</span>
        </template>

        <template #sizeTendency="scope" v-if="currentType.includes('大小')">
          <TendencyLine :data="scope" type="size" />
        </template>

        <template #countTendency="scope" v-if="currentType.includes('数量')">
          <TendencyLine :data="scope" type="count" />
        </template>

        <template
          v-for="item in currentTableConfig.tableConfig.propList.slice(PROP_LIST_LENGTH)"
          :key="item.prop"
          #[item.columnSlotName!]="scope"
        >
          <div v-if="currentType.includes('大小')">
            <span>{{ formatFileSize(scope[item.prop!]?.size)?.value ?? "-" }}</span>
            <div v-if="formatFileSize(scope[item.prop!]?.size)?.unit" class="ml-[2px] text-[10px]">
              {{ `(${formatFileSize(scope[item.prop!]?.size)?.unit})` }}
            </div>
          </div>

          <div v-if="currentType.includes('数量')">
            {{ addCommasToNumber(scope[item.prop!]?.count) ?? "-" }}
          </div>
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
        {{ (addCommasToNumber(currentCellData?.size) ?? "-") + " Byte" }}
      </div>

      <div v-if="currentType.includes('数量')" class="w-full text-center">
        {{ (addCommasToNumber(currentCellData?.count) ?? "-") + " 个" }}
      </div>
    </el-popover>
  </div>
</template>

<style scoped>
.custom-type:hover {
  font-weight: 600;
  color: white;
  text-shadow: 1px 1px 2px var(--global-blue);
  cursor: pointer;
}

:deep(.el-table .cell) {
  padding: 0 4px;
  font-size: 12px;
}
</style>
