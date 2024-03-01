<script lang="ts" setup>
import { cloneDeep } from "lodash-es"

import { BaseTable } from "@/base-ui"
import { typeOptions } from "@/global"
import { useTableResizeObserver } from "@/hooks"
import { sourceApi } from "@/services"
import type { ListResponseItem } from "@/services/source/types"
import { dateOffset } from "@/utils"

import { tableConfig } from "../config/table"
import { useFetchInfo } from "../use-fetch-info"

const props = defineProps<{ code: Record<string, string> }>()

const currentTableConfig = reactive(cloneDeep(tableConfig))

const tableContainerRef = ref<HTMLDivElement>()
const tableRef = ref<InstanceType<typeof BaseTable>>()

const tableData = ref<ListResponseItem[]>([])
const tableTotal = ref(0)
const tableLoading = ref(false)
const fetchTime = ref<string>("")

async function fetchListData() {
  if (!tableRef.value) return
  tableLoading.value = true
  sourceApi
    .queryThirdResourceList({ hostIp: props.code.hostIp ?? "" })
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

useFetchInfo(fetchTime, tableLoading, fetchListData)

// ===== 获取列表高度 =====
useTableResizeObserver(tableContainerRef, currentTableConfig, 40)

onMounted(() => fetchListData())
</script>

<template>
  <div class="flex h-full flex-col">
    <div ref="tableContainerRef" v-loading="tableLoading" class="flex-1">
      <BaseTable ref="tableRef" :config="currentTableConfig" :data="tableData" :count="tableTotal">
        <template #hostIp="scope">
          <span>
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
