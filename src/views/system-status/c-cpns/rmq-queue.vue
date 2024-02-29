<script lang="ts" setup>
import { cloneDeep } from "lodash-es"

import { BaseModal, BaseTable, ModalConfig } from "@/base-ui"
import { useTableResizeObserver } from "@/hooks"
import { systemStatusFRApi } from "@/services"
import type { RMQQueueResponse } from "@/services/system-status/types"
import { dateOffset } from "@/utils"

import { RMQTableQueueConfig } from "../config/table"

import LineChart from "./rmq-chart.vue"

const props = defineProps<{ code: Record<string, string> }>()

const currentTableConfig = reactive(cloneDeep(RMQTableQueueConfig))

const fetchTime = ref("")
const tableContainerRef = ref<HTMLDivElement>()
const tableRef = ref<InstanceType<typeof BaseTable>>()
const tableResponseData = ref<RMQQueueResponse["list"]>()
const tableTotal = ref(0)
const tableLoading = ref(false)
const sortInfo = reactive({ sortName: "", sortType: "" })

function fetchListData() {
  if (!tableRef.value) return
  const { currentPage, pageSize } = tableRef.value
  tableLoading.value = true

  systemStatusFRApi
    .queryThirdRmqArgLists({
      limit: pageSize,
      page: currentPage,
      hostIp: props.code.hostIp,
      port: props.code.port,
      ...sortInfo,
    })
    .then(res => {
      if (res?.code === 200) {
        tableResponseData.value = res?.data?.list
        tableTotal.value = res?.data?.total ?? 0
        fetchTime.value = dateOffset({ utc: true, format: "HH:mm:ss" })
      }
    })
    .catch(error => console.error(error))
    .finally(() => (tableLoading.value = false))
}

const modalConfig: ModalConfig = reactive({
  title: "demo",
  width: "80%",
})

const chartPayload = ref()
const modalRef = ref<InstanceType<typeof BaseModal>>()
function handleNameClick(rowData: RMQQueueResponse["list"][0]) {
  if (!modalRef.value) return
  modalConfig.title = rowData.queueName
  chartPayload.value = { ...rowData, ...props.code }
  modalRef.value.changeVisible(true)
}

// 分页器事件
currentTableConfig.paginationConfig!.events = {
  change: () => fetchListData(),
}
currentTableConfig.tableConfig["onSort-change"] = ({ prop, order }) => {
  const sortType = order === "descending" ? "desc" : order === "ascending" ? "asc" : ""
  sortInfo.sortName = sortType ? prop : ""
  sortInfo.sortType = sortType
  fetchListData()
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
      <template #queueName="scope">
        <span @click="handleNameClick(scope)" class="hole-enable">{{ scope.queueName }}</span>
      </template>
    </BaseTable>

    <BaseModal ref="modalRef" :config="modalConfig">
      <LineChart :payload="chartPayload" />
    </BaseModal>
  </div>
</template>
